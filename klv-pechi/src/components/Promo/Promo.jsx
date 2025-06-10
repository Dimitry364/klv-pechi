'use client';

import React from 'react';
import styles from './Promo.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import scrollToHash from '../utils/scrollToHash';

const Promo = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollToSection = (sectionId) => {
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) scrollToHash(`#${sectionId}`, 100);
    } else {
      router.push(`/#${sectionId}`);
    }
  };
  return (
    <section className={styles.promo}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Жаркие печи <br /> для бани <br />
            <span>только из Колывани!</span>
          </h1>
          <p className={styles.subtitle}>
            Надёжность, жар и стиль — то, что нужно для настоящей русской бани.
          </p>
          <div className={styles.buttons}>
            <button
              className={styles.primaryBtn}
              onClick={() => handleScrollToSection('stoves')}
            >
              Каталог
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => handleScrollToSection('about')}
            >
              О нас
            </button>
          </div>
        </div>

        <div className={styles.image}>
          <img src='/img/promo/promofence-Photoroom.png' alt='Печь Колывань' />
        </div>
      </div>
    </section>
  );
};

export default Promo;
