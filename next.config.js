/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Replit environment
  async rewrites() {
    return []
  },
  // Allow all hosts since Replit uses a proxy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
