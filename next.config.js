/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Replit environment
  async rewrites() {
    return [];
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
    ];
  },
  // Fix cross-origin dev warnings in Next.js 14+
  allowedDevOrigins: [
    'https://janeway.replit.dev', // Replit dev URL
    'http://localhost:3000',       // Local development
  ],
};

module.exports = nextConfig;
