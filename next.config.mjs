/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production'

    const baseDirectives = [
      "default-src 'self'",
      // Styles: self + inline (styled-jsx)
      "style-src 'self' 'unsafe-inline'",
      // Images: self, data and blob
      "img-src 'self' data: blob:",
      // Fonts: self
      "font-src 'self' data:",
      // Frames: restrict who can embed; allow self only
      "frame-ancestors 'self'",
      // Form submissions only to this origin
      "form-action 'self'",
      // Base URI
      "base-uri 'self'",
    ]

    const prodScript =
      "script-src 'self' 'unsafe-inline' https://vitals.vercel-insights.com https://va.vercel-scripts.com"
    const prodConnect =
      "connect-src 'self' https://vitals.vercel-insights.com"

    const devScript =
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws: wss: https://vitals.vercel-insights.com https://va.vercel-scripts.com"
    const devConnect =
      "connect-src 'self' http://localhost:* ws: wss: https://vitals.vercel-insights.com"

    const ContentSecurityPolicy = [
      ...baseDirectives,
      isDev ? devScript : prodScript,
      isDev ? devConnect : prodConnect,
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          // Note: HSTS should only be enabled behind HTTPS (e.g., in production)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

export default nextConfig
