/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages requires static export
  output: 'export',
  
  // Disable image optimization for static export (use native img or external CDN)
  images: {
    unoptimized: true,
  },
  
  // Build optimizations
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Trailing slash for better Cloudflare Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
