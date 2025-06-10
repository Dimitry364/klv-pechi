'use client';

import { useEffect } from 'react';
import scrollToHash from '@/components/utils/scrollToHash';
import styles from './ProductPageClient.module.scss';
import ProductList from '@/components/ProductList/ProductList';

export default function ProductPageClient({ stoves, accessories }) {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      setTimeout(() => {
        scrollToHash(hash, 100);
      }, 200);
    }
  }, []);

  return (
    <>
      <section className={styles.section} id='stoves'>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Печи</h2>
          <p className={styles.sectionSubtitle}>
            Жаркие печи для настоящей русской бани
          </p>
        </div>
        <ProductList products={stoves} />
      </section>

      <section className={styles.section} id='accessories'>
        <div className={styles.sectionBox}>
          <h2 className={styles.sectionTitle}>Аксессуары</h2>
          <p className={styles.sectionSubtitle}>
            Для комфорта, уюта и огня под контролем
          </p>
        </div>
        <ProductList products={accessories} />
      </section>
    </>
  );
}
