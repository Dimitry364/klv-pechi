export const metadata = {
  // Базовая разметка. Всё остальное — в (site)/layout.js
  title: {
    default: 'Колывань-Печи',
    template: '%s — Доставка по всей России',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/img/icons/icon-192.png',
    other: [
      {
        rel: 'icon',
        url: '/img/icons/icon-192.png',
        sizes: '192x192',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body>{children}</body>
    </html>
  );
}
