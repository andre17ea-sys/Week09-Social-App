import { db } from "@/utils/dbConn";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditProfile() {
  // get current logged-in user's clerk ID
  const { userId } = await auth();

  const userResult = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    userId,
  ]);
  const user = userResult.rows[0];

  // if user doesn't exist, redirect to create-profile
  if (!user) {
    redirect("/create-profile");
  }

  async function handleUpdate(formData) {
    "use server";

    // take form data
    const { username, bio } = Object.fromEntries(formData);

    // update user in db
    await db.query(
      "UPDATE users SET username = $1, bio = $2 WHERE clerk_id = $3",
      [username, bio, userId]
    );

    redirect("/profile");
  }

  // render form pre-filled with current data
  return (
    <form action={handleUpdate} className="p-4 flex flex-col gap-4 max-w-md">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        required
        defaultValue={user.username}
        className="border p-2 rounded"
      />

      <label htmlFor="bio">Biography:</label>
      <textarea
        name="bio"
        id="bio"
        rows={4}
        defaultValue={user.bio}
        className="border p-2 rounded"
      ></textarea>

      <button
        type="submit"
        className="bg-[#6c47ff] text-white rounded-full font-medium h-10 px-4 cursor-pointer"
      >
        Update Profile
      </button>
    </form>
  );
}
