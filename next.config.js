/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          destination: '/:tenant/:path*',
          has: [{ 
            type: 'header',
            key: 'x-tenant',
            value: '(?<tenant>.*)',
          }],
        },
      ],
    }
  },
}

module.exports = nextConfig
