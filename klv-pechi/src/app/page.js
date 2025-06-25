import styles from './page.module.css';
import Promo from '../components/Promo/Promo';
import { productService } from '@/lib/ProductService';
// import { galleryService } from '@/lib/galleryService';
// import GallerySection from '@/components/GallerySection/GallerySection';
import ProductPageClient from '@/components/ProductPageClient/ProductPageClient';
import AboutSection from '@/components/AboutSection/AboutSection';
import DeliverySection from '@/components/DeliverySection/DeliveryAndPayment';

export default async function Home() {
  const mongoProducts = await productService.getProducts();
  const products = JSON.parse(JSON.stringify(mongoProducts));

  // const images = await galleryService.getGalleryImages();

  const stoves = products.filter((p) => p.category === 'stoves');
  const accessories = products.filter((p) => p.category === 'accessories');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Promo />
        <ProductPageClient stoves={stoves} accessories={accessories} />
        <AboutSection />
        <DeliverySection />
        {/* <GallerySection images={images} /> */}
      </main>
    </div>
  );
}
