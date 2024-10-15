/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/id/**",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        pathname: "/th/*",
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com",
        pathname: "/photo/**",
      },
    ],
  },
};

export default nextConfig;
