import styles from './page.module.css';
import Promo from '../components/Promo/Promo';
import { productService } from '@/lib/ProductService';
import ProductPageClient from '@/components/ProductPageClient/ProductPageClient';
import AboutSection from '@/components/AboutSection/AboutSection';
import DeliverySection from '@/components/DeliverySection/DeliveryAndPayment';
import GallerySection from '@/components/GallerySection/GallerySection';

export default async function Home() {
  const mongoProducts = await productService.getProducts();
  const products = JSON.parse(JSON.stringify(mongoProducts));

  const stoves = products.filter((p) => p.category === 'stoves');
  const accessories = products.filter((p) => p.category === 'accessories');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Promo />
        <ProductPageClient stoves={stoves} accessories={accessories} />
        <GallerySection />
        <AboutSection />
        <DeliverySection />
      </main>
    </div>
  );
}
