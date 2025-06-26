/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true, // удаляет неиспользуемый CSS
  },
};

export default nextConfig;
