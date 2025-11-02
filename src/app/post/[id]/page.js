import { db } from "@/utils/dbConn";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EachPost({ params }) {
  const resolvedParams = await params; // unwrap params promise
  const { id } = resolvedParams; // get id

  // query post- user info
  const response = await db.query(
    "SELECT posts.*, users.id, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1",
    [id]
  );

  const post = response.rows[0];

  if (!post) {
    notFound(); //404
  }

  return (
    <div className="p-4">
      <p>
        {post.username} |{" "}
        {new Date(post.created_at).toLocaleDateString("en-gb")}
      </p>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      {post.img && (
        <Image
          src={post.img}
          alt={post.title}
          width={400}
          height={400}
          className="my-2"
        />
      )}
      <p>{post.content}</p>
    </div>
  );
}
