'use client';

import React from 'react';
import styles from './Promo.module.scss';
import Image from 'next/image';
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
          <p className={styles.kicker}>Собственное производство</p>
          <h1 className={styles.title}>Эксклюзивные печи для бани</h1>
          <p className={styles.tagline}>Для тех, кто выбирает лучшее</p>
          <p className={styles.subtitle}>
            <span className={styles.subtitleSpan}>
              Нержавеющая сталь AISI&nbsp;321
            </span>
            <span className={styles.subtitleSpan}>
              Гарантия и доставка по всей России
            </span>
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
          <Image
            src='/img/promo/promofence-Photoroom.webp'
            alt='Печь Колывань'
            width={500}
            height={600}
            priority
            fetchPriority='high'
            sizes='(max-width: 768px) 0px, (max-width: 1200px) 35vw, 500px'
          />
        </div>
      </div>
    </section>
  );
};

export default Promo;
