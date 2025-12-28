/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Hostinger/static hosting
  // Set STATIC_EXPORT=true in env for static build
  // For Vercel deployment, leave this undefined
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,

  // Trailing slash for static hosting compatibility
  trailingSlash: process.env.STATIC_EXPORT === 'true',

  // Image optimization for Vercel
  images: {
    // Disable image optimization for static export
    unoptimized: process.env.STATIC_EXPORT === 'true',
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
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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

  // Compression
  compress: true,

  // Strict mode for better development
  reactStrictMode: true,

  // Powered by header - disabled for security
  poweredByHeader: false,

  // Generate ETags for caching
  generateEtags: true,

  // Compiler options for production optimization
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Modular imports for better tree-shaking
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Headers for security, caching, and SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS/CSS bundles
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Preload critical resources
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</images/logo/Snapgo Logo White.png>; rel=preload; as=image',
          },
        ],
      },
    ]
  },

  // Redirects for SEO (www to non-www)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.snapgo.co.in',
          },
        ],
        destination: 'https://snapgo.co.in/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
