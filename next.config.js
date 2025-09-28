/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // recommended

  // Rewrites (empty for now, can add later)
  async rewrites() {
    return [];
  },

  // Headers to allow framing, etc.
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
    ];
  },

  // Allowed dev origins for Next.js 14+ (array)
  allowedDevOrigins: [
    'https://*.replit.dev',  // wildcard for all Replit dev URLs
    'http://localhost:5000', // local dev port
  ],
};

module.exports = nextConfig;