import styles from './page.module.css';
import Promo from '@/components/Promo/Promo';
import { getCatalogSections } from '@/lib/CategoryServiceSanity';
// import { getProducts } from '@/lib/ProductServiceSanity';
import { getGallery } from '@/lib/galleryServiceSanity';
import ProductPageClient from '@/components/ProductPageClient/ProductPageClient';
import AboutSection from '@/components/AboutSection/AboutSection';
import DeliverySection from '@/components/DeliverySection/DeliveryAndPayment';
import GallerySection from '@/components/GallerySection/GallerySection';
import VideoShort from '@/components/VideoShorts/VideoReview';

export default async function Home() {
  const [sections, albums] = await Promise.all([
    getCatalogSections(),
    getGallery(),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Promo />
        <VideoShort
          title='Видеообзор печей «Колывань»'
          mp4='/video/kolyvan-short.mp4'
          webm='/video/kolyvan-short.webm'
          poster='/video/kolyvan-short-poster.jpg'
          playButton='/video/play-button.svg'
          durationHint='6:50'
          chips={[
            'Нерж. сталь AISI 321',
            'Производство в России',
            'Гарантия 5 лет',
          ]}
        />
        <ProductPageClient sections={sections} />
        <GallerySection albums={albums} />
        <AboutSection />
        <DeliverySection />
      </main>
    </div>
  );
}
