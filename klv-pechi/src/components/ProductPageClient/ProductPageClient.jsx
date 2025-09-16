'use client';

import { useEffect } from 'react';
import scrollToHash from '@/components/utils/scrollToHash';
import styles from './ProductPageClient.module.scss';
import ProductList from '@/components/ProductList/ProductList';

export default function ProductPageClient({ sections = [] }) {
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
      {sections.map(({ category, products }) => (
        <section
          key={category.slug}
          className={styles.section}
          id={category.slug}
        >
          {products.length > 0 ? (
            <div className={styles.sectionBox}>
              <h2 className={styles.sectionTitle}>{category.title}</h2>
              {category.subtitle ? (
                <p className={styles.sectionSubtitle}>{category.subtitle}</p>
              ) : null}
            </div>
          ) : null}
          <ProductList products={products} />
        </section>
      ))}
    </>
  );
}
