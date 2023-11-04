/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.edgestore.dev'],
  },
  typescript: {
    // had to do it
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
