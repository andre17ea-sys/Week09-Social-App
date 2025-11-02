import { db } from "@/utils/dbConn";
import { revalidatePath } from "next/cache";
import PostsMotion from "@/components/PostsMotion";

export default async function Home() {
  // query all posts
  const posts = (
    await db.query(
      `SELECT posts.*, users.username 
       FROM posts 
       JOIN users ON posts.user_id = users.id 
       ORDER BY posts.created_at DESC`
    )
  ).rows;

  async function handleLike(formData) {
    "use server";
    const { postId } = Object.fromEntries(formData);

    await db.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [
      postId,
    ]);

    revalidatePath("/");
  }

  return <PostsMotion posts={posts} handleLike={handleLike} />;
}
