/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow images from any domain, local or external
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all external https images
      },
    ],
    unoptimized: true, // still allow using local /public images too
  },
};

export default nextConfig;
