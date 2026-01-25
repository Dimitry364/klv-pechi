/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import './globals.css';

export const metadata = {
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
      <head>
        {/* Яндекс.Метрика */}
        <Script
          id='yandex-metrika'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(105456265, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            `,
          }}
        />
      </head>

      <body>
        <noscript>
          <img
            src='https://mc.yandex.ru/watch/105456265'
            style={{ position: 'absolute', left: '-9999px' }}
            alt=''
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
