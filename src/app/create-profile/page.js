import { db } from "@/utils/dbConn";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateProfile({ searchParams }) {
  const { userId } = await auth();

  // check if user already exists
  const existing = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    userId,
  ]);

  // if profile exists-show msg, not form
  if (existing.rows.length > 0) {
    return (
      <div className="p-4 max-w-md">
        <p className="text-red-500 font-medium">
          Sorry! You already have a profile.
        </p>
        <p>
          Go to your{" "}
          <a href="/profile" className="text-blue-600">
            profile page
          </a>
          .
        </p>
      </div>
    );
  }

  async function handleSubmit(formData) {
    "use server";

    const { username, bio } = Object.fromEntries(formData);

    // new user to db
    await db.query(
      "INSERT INTO users (clerk_id, username, bio) VALUES ($1, $2, $3)",
      [userId, username, bio]
    );

    redirect("/profile");
  }

  // render form if no existing profile
  return (
    <form action={handleSubmit} className="p-4 flex flex-col gap-4 max-w-md">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        required
        className="border p-2 rounded"
      />

      <label htmlFor="bio">Biography:</label>
      <textarea
        name="bio"
        id="bio"
        rows={4}
        className="border p-2 rounded"
      ></textarea>

      <button
        type="submit"
        className="bg-[#6c47ff] text-white rounded-full font-medium h-10 px-4 cursor-pointer"
      >
        Create Profile
      </button>
    </form>
  );
}
