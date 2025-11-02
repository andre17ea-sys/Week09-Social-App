import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <p className="text-xl mb-4">Sorry! We could not find that post.</p>
      <p>
        Go back to →
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          Home
        </Link>
        ← page
      </p>
    </div>
  );
}
