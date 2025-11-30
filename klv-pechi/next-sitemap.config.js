/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://xn----7sbfophhsfp3gvbq.xn--p1ai',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: ['/cart', '/admin/*', '/api/*'],
};
