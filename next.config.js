/** @type {import('next').NextConfig} */

// Detect if we're building for static export (Hostinger/static hosting)
const isStaticExport = process.env.STATIC_EXPORT === 'true'

const nextConfig = {
  // HOSTINGER: Enable static export for Hostinger shared hosting
  // Run: npm run build:static (or set STATIC_EXPORT=true)
  // Then upload the 'out' folder contents to public_html
  output: isStaticExport ? 'export' : undefined,

  // Trailing slash required for static hosting (Apache)
  trailingSlash: isStaticExport,

  // Build output directory
  distDir: isStaticExport ? 'out' : '.next',

  // Image optimization
  images: {
    // MUST disable optimization for static export
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'snapgo.in',
      },
      {
        protocol: 'https',
        hostname: 'snapgo.co.in',
      },
      {
        protocol: 'https',
        hostname: 'www.snapgo.co.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@react-three/drei',
      '@react-three/fiber',
      'framer-motion',
      'three',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
    ],
  },

  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Headers and redirects only work on Vercel/Node.js (NOT static export)
  ...(isStaticExport ? {} : {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          ],
        },
        {
          source: '/images/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
        {
          source: '/_next/static/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'www.snapgo.co.in' }],
          destination: 'https://snapgo.co.in/:path*',
          permanent: true,
        },
      ]
    },
  }),
}

module.exports = nextConfig
