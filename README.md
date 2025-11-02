#Social Network App

##Overview

This project is a simple social network built using Next.js, Clerk for user authentication, and Radix UI for enhanced user interface components. The application allows users to securely sign up, log in, create and edit their profiles, and submit posts associated with their account. Each post can be liked by the user, and all content is displayed dynamically on the profile page. The app also implements error handling for non-existent pages, ensuring a smooth user experience.

The application was designed to be responsive on both mobile and desktop devices, using Tailwind CSS for styling, while incorporating modern UI primitives from Radix UI and subtle animations with Framer Motion.

##Features Implemented

Users can sign up and log in securely through Clerk. Once authenticated, users can create their profile, input personal information such as a biography, and manage their posts. All posts are associated with the user's Clerk ID and displayed on their profile page. Users are also able to like posts. Navigation includes separators using Radix UI primitives, providing a visually clear structure between different navigation links. Pages are styled minimally for readability, and the application handles errors by displaying not-found pages when users attempt to access invalid routes.

##Challenges

Initially, the like functionality worked, but the delete button did not appear and threw a ReferenceError: handleLike is not defined due to scope issues.

Integrating Framer Motion for scroll animations caused a Runtime Error because motion components were being used in a server component, requiring the creation of a separate client-side component.

While implementing Radix UI, a wrong import path (@radix-uri/react-separator) caused module not found errors, which was resolved by installing the correct package (@radix-ui/react-separator) and importing it properly.

General Next.js constraints, such as async server functions in client components, caused ESLint errors (Prevent Client Components from being async functions) and required careful restructuring.

Minor challenges with state revalidation after server actions (revalidatePath) to ensure the UI updated correctly after liking or deleting posts.

##Reflection

Due to personal circumstances, including being unwell, I was unable to dedicate as much time to styling and polishing the application. As a result, the interface is functional but minimally styled, avoiding plain white pages but not yet fully refined. Despite these constraints, the application meets the core requirements: user authentication, profile management, post creation and management, error handling, and basic UI enhancements using Radix UI and Framer Motion.

## Sources

🔍https://medium.com/@sriranjankapilan/building-a-secure-next-js-app-with-clerk-auth-social-login-and-role-management-26c11d3f3cdb
🔍 https://www.bing.com/videos/riverview/relatedvideo?&q=Set+up+user+sign-up+and+user+login+using+Clerk.&qpvt=Set+up+user+sign-up+and+user+login+using+Clerk.&mid=3F7C8B182E7BCD22F3173F7C8B182E7BCD22F317&&FORM=VRDGAR
🔍 https://github.com/OpenSauce04/nextjs-social-platform/tree/main
🔍https://stackoverflow.com/questions/68911899/dynamically-updating-content-eg-clicking-button-updates-div-and-update-url-on
🔍https://www.buildwithmatija.com/blog/clerk-authentication-nextjs15-app-router

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
