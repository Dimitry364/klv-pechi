/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    legacyBrowsers: false, // отключает поддержку устаревших браузеров
    optimizeCss: true, // удаляет неиспользуемый CSS
  },
};

export default nextConfig;
