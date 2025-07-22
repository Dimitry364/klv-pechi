/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true, // удаляет неиспользуемый CSS
    output: 'standalone',
    experimental: {
      instrumentationHook: true,
    },
  },
};

export default nextConfig;
