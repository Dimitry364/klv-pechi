import styles from './page.module.css';
import Promo from '../components/Promo/Promo';
import { productService } from '@/lib/ProductService';
// import { galleryService } from '@/lib/galleryService';
import ProductPageClient from '@/components/ProductPageClient/ProductPageClient';
import AboutSection from '@/components/AboutSection/AboutSection';
import DeliverySection from '@/components/DeliverySection/DeliveryAndPayment';
import GallerySection from '@/components/GallerySection/GallerySection';

export default async function Home() {
  const mongoProducts = await productService.getProducts();
  const products = JSON.parse(JSON.stringify(mongoProducts));

  const stoves = products.filter((p) => p.category === 'stoves');
  const accessories = products.filter((p) => p.category === 'accessories');

  // const mongoAlbums = await galleryService.getGalleryAlbum();
  // const albums = JSON.parse(JSON.stringify(mongoAlbums));

  const res = await fetch(
    `${process.env.API_URL || 'http://localhost:3000'}/api/gallery`,
    {
      cache: 'no-store',
    }
  );
  const albums = await res.json();
  console.log('albums length', albums?.length);
  console.log('album', albums?.[0]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Promo />
        <ProductPageClient stoves={stoves} accessories={accessories} />
        <GallerySection albums={albums} />
        <AboutSection />
        <DeliverySection />
      </main>
    </div>
  );
}
