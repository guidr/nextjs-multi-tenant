/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          destination: '/:host/:path*',
          has: [{ 
            type: 'host', 
            value: '(?<host>.*)',
          }],
        },
      ],
    }
  },
}

module.exports = nextConfig
