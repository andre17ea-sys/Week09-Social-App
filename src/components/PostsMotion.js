"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PostsMotion({ posts, handleLike }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          className="mb-5 border p-2 rounded hover:bg-orange-200"
          initial={{ opacity: 0, y: 40 }} // start invisible & moved down
          whileInView={{ opacity: 1, y: 0 }} // appear & move to correct place
          viewport={{ once: true, amount: 0.5 }} // trigger when 50% in view
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
          }}
        >
          {/* link to individual post */}
          <a href={`/post/${post.id}`} className="block">
            <p className="text-blue-700 underline cursor-pointer">
              {post.username} |{" "}
              {new Date(post.created_at).toLocaleDateString("en-gb")}
            </p>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {post.img && (
              <Image
                src={post.img}
                alt={post.title}
                width={400}
                height={400}
                className="my-2"
              />
            )}
          </a>
          <p>{post.content}</p>

          {/* likes */}
          <p>Likes: {post.likes}</p>
          <form action={handleLike}>
            <input type="hidden" name="postId" value={post.id} />
            <button
              type="submit"
              className="mt-1 bg-pink-400 text-white rounded-full px-3 py-1 text-sm cursor-pointer"
            >
              Like 👍
            </button>
          </form>
        </motion.div>
      ))}
    </div>
  );
}
