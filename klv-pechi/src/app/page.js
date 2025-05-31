import styles from './page.module.css';
import Promo from '../components/Promo/Promo';
import { productService } from '@/lib/ProductService';
import ProductPageClient from '@/components/ProductPageClient/ProductPageClient';

export default async function Home() {
  const products = await productService.getProducts();

  const stoves = products.filter((p) => p.category === 'stoves');
  const accessories = products.filter((p) => p.category === 'accessories');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Promo />
        <ProductPageClient stoves={stoves} accessories={accessories} />
      </main>
    </div>
  );
}
