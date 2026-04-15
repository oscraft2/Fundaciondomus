/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' www.googletagmanager.com;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              img-src 'self' data: https: firebasestorage.googleapis.com lh3.googleusercontent.com;
              font-src 'self' data: fonts.gstatic.com;
              connect-src 'self' firestore.googleapis.com identitytoolkit.googleapis.com cpbjr.github.io calapi.inadiutorium.cz www.google-analytics.com;
              frame-ancestors 'self';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  },

  // CORS & Security
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/:path*'
        }
      ]
    }
  },

  // Environment Variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  }
}

module.exports = nextConfig
