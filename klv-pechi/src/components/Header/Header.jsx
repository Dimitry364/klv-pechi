'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaShoppingCart,
  FaBars,
} from 'react-icons/fa';
import styles from './Header.module.scss';
import scrollToHash from '../utils/scrollToHash';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href='/' className={styles.logo}>
          <Image
            src='/img/logo/Logored_kolivan2.svg'
            alt='Колывань'
            width={48}
            height={48}
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <button
            className={styles.buttonScroll}
            onClick={() => handleScrollToSection('stoves')}
          >
            Каталог
          </button>
          <Link href='/contacts' className={styles.link}>
            Контакты
          </Link>
        </nav>

        {/* Right Side: Icons */}
        <div className={styles.actions}>
          <Link href='/cart' className={styles.icon}>
            <FaShoppingCart />
          </Link>
          <a
            href='https://t.me/kolivan'
            target='_blank'
            className={styles.icon}
          >
            <FaTelegramPlane />
          </a>
          <a
            href='https://wa.me/79513645566'
            target='_blank'
            className={styles.icon}
          >
            <FaWhatsapp />
          </a>
          <a href='tel:+79513645566' className={styles.phone}>
            +7 (951) 364-55-66
          </a>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href='/catalog' onClick={() => setMenuOpen(false)}>
            Каталог
          </Link>
          <Link href='/contacts' onClick={() => setMenuOpen(false)}>
            Контакты
          </Link>
          <Link href='/cart' onClick={() => setMenuOpen(false)}>
            Корзина
          </Link>
          <a href='tel:+79513645566' onClick={() => setMenuOpen(false)}>
            +7 (951) 364-55-66
          </a>
        </div>
      )}
    </header>
  );
}
