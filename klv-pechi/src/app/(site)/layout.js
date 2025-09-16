import Header from '@/components/Header/Header';
import '../globals.css';
import { CartProvider } from '@/context/CartContext';
import FeedbackSection from '@/components/FeedbackSection/FeedbackSection';

export const metadata = {
  title: 'Колывань-Печи — печи и бездымовые костровые чаши от производителя',
  description:
    'Качественные печи и бездымовые костровые чаши из нержавеющей стали AISI 321. Производство и доставка по всей России. Гарантия, заводская сборка, доставка в регионы.',
  keywords: [
    // Продукты
    'печи Колывань',
    'печи для бани',
    'печи для сауны',
    'печи на дровах',
    'печи из нержавейки',
    'печи AISI 321',
    'печи с гарантией',
    'печи от производителя',
    'печи с доставкой',

    // Костровые чаши
    'костровые чаши',
    'бездымные костровые чаши',

    // Условия и клиенты
    'печи оптом',
    'печи для магазинов',
    'печи для дачи',
    'печи для загородного дома',
    'печи для стройки',
    'печи для кемпинга',

    // Гео-таргетинг
    'печи в Москве',
    'печи в Санкт-Петербурге',
    'печи в Новосибирске',
    'печи в Екатеринбурге',
    'печи в Казане',
    'печи в Нижний Новгороде',
    'печи в Челябинске',
    'печи в Омске',
    'печи в Красноярске',
    'печи в Перми',
    'печи в Барнауле',
    'печи в Воронеже',
    'печи по России',
  ],
  metadataBase: new URL('https://колывань-печи.рф'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Колывань-Печи — печи и бездымовые костровые чаши из нержавеющей стали',
    description:
      'Производим печи и бездымовые костровые чаши из нержавеющей стали AISI 321. Прямая поставка от производителя. Работаем по всей России.',
    url: 'https://колывань-печи.рф',
    siteName: 'Колывань-Печи',
    images: [
      {
        url: 'https://колывань-печи.рф/img/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Колывань-Печи — печи и бездымовые костровые чаши',
        type: 'image/jpeg',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Колывань-Печи — печи из нержавеющей стали AISI 321',
    description:
      'Производство печей и бездымовых костровых чаш с доставкой по России.',
    images: ['https://колывань-печи.рф/img/og-main.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/img/icons/icon-192.png' sizes='192x192' />
        <link rel='apple-touch-icon' href='/img/icons/icon-192.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='theme-color' content='#0a0a0a' />
        {/* schema.org Organization */}
        <script
          suppressHydrationWarning
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Колывань-Печи',
              url: 'https://колывань-печи.рф',
              logo: 'https://колывань-печи.рф/img/logo/Logored.svg',
              description:
                'Производство печей и бездымных костровых чаш из нержавеющей стали AISI 321 с доставкой по всей России.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'RU',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+7-951-364-55-66',
                contactType: 'sales',
                areaServed: 'RU',
              },
              sameAs: [
                'https://t.me/+79513645566',
                'https://wa.me/79513645566',
                'https://vk.com/club229742329',
              ],
            }),
          }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <FeedbackSection />
        </CartProvider>
      </body>
    </html>
  );
}
