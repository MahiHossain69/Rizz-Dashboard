/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // Since we're using JSX
  },
}

module.exports = nextConfig
