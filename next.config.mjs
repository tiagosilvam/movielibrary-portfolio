/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**'",
      },
      {
        protocol: "https",
        hostname: "media.themoviedb.org",
        port: "",
        pathname: "/**'",
      },
      {
        protocol: "https",
        hostname: "generated.vusercontent.net",
        port: "",
        pathname: "/**'",
      },
    ],
  },
};

export default nextConfig;
