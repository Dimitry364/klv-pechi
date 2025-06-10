'use client';

import styles from './FeaturesSection.module.scss';
import features from '@/components/utils/featureText';

export default function FeaturesSection() {
  return (
    <section id='benefits' className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Преимущества</h2>
        <div className={styles.grid}>
          {features.map((item, index) => (
            <div className={styles.feature} key={index}>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
