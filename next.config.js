/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pbs.twimg.com", "media-exp1.licdn.com", "x.com"],
  },
};

module.exports = nextConfig;
