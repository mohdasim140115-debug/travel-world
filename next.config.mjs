/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the user's home folder made Next pick that
  // directory as the workspace root, so Tailwind scanned the wrong tree and
  // dev builds silently dropped newly added utility classes. Pin the root.
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    // AVIF first, WebP for browsers without it; the original jpeg is the
    // last resort. Ordered by preference — the first Accept match wins.
    formats: ["image/avif", "image/webp"],

    // Airline logos and vehicle photos are served from Wikimedia. The
    // Special:FilePath URLs redirect to upload.wikimedia.org, so both
    // hosts have to be allowed for the optimizer to fetch them.
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org", pathname: "/wiki/Special:FilePath/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
  },

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
