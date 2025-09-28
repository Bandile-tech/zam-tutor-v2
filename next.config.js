/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional but recommended

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

  // Allow cross-origin requests from Replit dev URLs
  allowedDevOrigins: 'https://*.replit.dev', // single string only
};

module.exports = nextConfig;