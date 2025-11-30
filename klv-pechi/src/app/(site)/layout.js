import Header from '@/components/Header/Header';
import '../globals.css';
import { CartProvider } from '@/context/CartContext';
import FeedbackSection from '@/components/FeedbackSection/FeedbackSection';
import { SITE_URL, SITE_NAME } from '@/config/site';
import { createPageMetadata } from '@/seo/baseSeo';

const baseMeta = createPageMetadata({
  title: `${SITE_NAME} — печи для бани и бездымные костровые чаши`,
  description:
    'Производство печей для бани из нержавеющей стали AISI 321 и бездымных костровых чаш. Экономия дров до 50%, мягкий пар, доставка по всей России.',
  path: '/',
  index: true,
});

export const metadata = {
  ...baseMeta,
  metadataBase: new URL(SITE_URL),
  themeColor: '#0a0a0a',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/img/icons/icon-192.png',
    other: [{ rel: 'icon', url: '/img/icons/icon-192.png', sizes: '192x192' }],
  },
};

export default function SiteLayout({ children }) {
  return (
    <>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <FeedbackSection />
      </CartProvider>
    </>
  );
}
