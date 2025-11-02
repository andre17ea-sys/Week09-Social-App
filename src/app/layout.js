import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import * as Separator from "@radix-ui/react-separator";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Social Network",
  description: "A simple social network with Clerk auth",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* header with navigation */}
          <header className="flex justify-between items-center p-4 h-16 border-b">
            {/*  logo-left side */}
            <Link href="/" className="text-xl font-bold text-purple-600">
              Social App
            </Link>

            {/* nav links - only if signed in */}
            <nav className="flex gap-4 items-center">
              <SignedIn>
                <Link href="/" className="text-gray-700 hover:text-purple-600">
                  Home
                </Link>

                {/* separator */}
                <Separator.Root
                  className="mx-2 bg-fuchsia-500 w-px h-5"
                  orientation="vertical"
                  decorative
                />

                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Profile
                </Link>

                <Separator.Root
                  className="mx-2 bg-fuchsia-500 w-px h-5"
                  orientation="vertical"
                  decorative
                />

                <Link
                  href="/create-post"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Create Post
                </Link>

                <Separator.Root
                  className="mx-2 bg-fuchsia-500 w-px h-5"
                  orientation="vertical"
                  decorative
                />

                <Link
                  href="/create-profile"
                  className="text-gray-700 hover:text-purple-600"
                >
                  Create Profile
                </Link>
              </SignedIn>
            </nav>

            {/* auth btn - right side */}
            <div className="flex gap-2">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium h-10 px-4 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
