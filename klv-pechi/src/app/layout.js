import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import FeedbackSection from '@/components/FeedbackSection/FeedbackSection';

export const metadata = {
  title: 'Колывань-Печи — печи и мангалы от производителя',
  description:
    'Качественные печи, мангалы и чаши из нержавеющей стали AISI 321. Производство и доставка по всей России.',
  keywords: [
    'печи',
    'печь Колывань',
    'мангалы',
    'костровые чаши',
    'печи оптом',
    'печи из нержавейки',
  ],
  metadataBase: new URL('https://колывань-печи.рф'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Колывань-Печи — печи, мангалы и без дымные кастровые чаши из нержавеющей стали',
    description:
      'Изготовление и поставка печей по России. AISI 321, гарантия, доставка.',
    url: '/',
    siteName: 'Колывань-Печи',
    images: [
      {
        url: '/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Колывань-Печи',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Колывань-Печи',
    description: 'Печи, мангалы, костровые чаши',
    images: ['/og-main.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
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
