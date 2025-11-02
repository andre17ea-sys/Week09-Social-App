import { db } from "@/utils/dbConn";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function CreatePost() {
  // get current logged-in user's Clerk ID
  const { userId } = await auth();

  // db id for user
  const userResult = await db.query(
    "SELECT id FROM users WHERE clerk_id = $1",
    [userId]
  );
  const user = userResult.rows[0];

  async function handlePost(formData) {
    "use server";
    m;
    const { title, content, img } = Object.fromEntries(formData);

    // new post into db
    await db.query(
      "INSERT INTO posts (user_id, title, content, img, created_at, likes) VALUES ($1, $2, $3, $4, NOW(), 0)",
      [user.id, title, content, img]
    );

    revalidatePath("/");

    // redirect to homepage after creating post
    redirect("/");
  }

  return (
    <form action={handlePost} className="p-4 flex flex-col gap-4 max-w-md">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        required
        className="border p-2 rounded"
      />

      {/*  post content */}
      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        id="content"
        rows={4}
        required
        className="border p-2 rounded"
      ></textarea>

      <label htmlFor="img">Image URL (optional):</label>
      <input
        type="text"
        name="img"
        id="img"
        placeholder="/images/DonaldDuck.jpg"
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-[#6c47ff] text-white rounded-full font-medium h-10 px-4 cursor-pointer"
      >
        Create Post
      </button>
    </form>
  );
}
