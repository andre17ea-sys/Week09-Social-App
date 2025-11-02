import { clerkMiddleware } from "@clerk/nextjs/server";

// export default middleware function ///  check authentication and protect routes if needed

export default clerkMiddleware();

// config object to define which routes middleware applies to
export const config = {
  matcher: [
    // skip next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // always run for API routes
    "/(api|trpc)(.*)",
  ],
};
