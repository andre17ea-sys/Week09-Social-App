import { db } from "@/utils/dbConn";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import PostsMotion from "@/components/PostsMotion";

export default async function Profile() {
  const { userId } = await auth();

  const userResult = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    userId,
  ]);
  const user = userResult.rows[0];

  if (!user) {
    notFound(); // render 404 if user not found
  }

  // get all posts created by this user
  const userPostsResult = await db.query(
    "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
    [user.id]
  );
  const userPosts = userPostsResult.rows;

  // server action to delete post
  async function handleDelete(formData) {
    "use server";
    const { postId } = Object.fromEntries(formData); // get postId from form

    // delete post from db
    await db.query("DELETE FROM posts WHERE id = $1 AND user_id = $2", [
      postId,
      user.id,
    ]);

    // revalidate profile page to show updated posts
    revalidatePath("/profile");
  }

  // server to like a post
  async function handleLike(formData) {
    "use server";
    const { postId } = Object.fromEntries(formData);

    // increment likes count
    await db.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [
      postId,
    ]);

    // revalidate profile page to update likes
    revalidatePath("/profile");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <br></br>
      <p className="mb-4">{user.bio || "No biography yet."}</p>
      <br></br>

      <div className="mb-4">
        <a
          href="/edit-profile"
          className="text-blue-500 underline hover:text-blue-900"
        >
          Edit Profile
        </a>
      </div>

      <h2 className="text-xl font-semibold mb-2">Your Posts</h2>

      {userPosts.length === 0 ? (
        <p>You have not created any posts yet.</p>
      ) : (
        <PostsMotion
          posts={userPosts}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
