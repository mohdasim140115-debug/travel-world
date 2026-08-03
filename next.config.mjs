/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  // Keeps the public URL as the single hyphenated segment
  // /tour-packages-from-mumbai while the actual route lives at
  // the dynamic folder src/app/tour-packages-from/[city]/page.jsx
  // (App Router folder names can't mix literal text with [param]
  // inside one path segment, so a rewrite bridges the two).
  async rewrites() {
    return [
      {
        source: "/tour-packages-from-:city",
        destination: "/tour-packages-from/:city",
      },
    ];
  },
};

export default nextConfig;
