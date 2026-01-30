/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // optimizeCss: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
};

export default nextConfig;
