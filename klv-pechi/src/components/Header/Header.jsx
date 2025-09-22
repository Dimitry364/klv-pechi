'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaWhatsapp, FaTelegramPlane, FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.scss';
import scrollToHash from '../utils/scrollToHash';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();

  const navItems = [
    { label: 'Каталог', sectionId: 'stoves' },
    { label: 'Галерея', sectionId: 'gallery' },
    { label: 'О нас', sectionId: 'about' },
    { label: 'Доставка и оплата', sectionId: 'delivery' },
    { label: 'Контакты', sectionId: 'contact' },
  ];

  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'contact') {
      scrollToHash(`#${sectionId}`, 100);
    } else if (pathname === '/') {
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
            height={58}
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              className={styles.buttonScroll}
              onClick={() => handleScrollToSection(item.sectionId)}
              aria-label={`Перейти к ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Icons */}
        <div className={styles.actions}>
          <Link href='/cart' className={styles.icon}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </Link>
          <a
            href='https://t.me/+79513645566'
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
            className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label='Меню'
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.sectionId}
            className={styles.buttonScroll}
            onClick={() => {
              handleScrollToSection(item.sectionId);
              setMenuOpen(false);
            }}
            aria-label={`Перейти к ${item.label}`}
          >
            {item.label}
          </button>
        ))}

        <Link href='/cart' onClick={() => setMenuOpen(false)}>
          Корзина
        </Link>
        <Link href='tel:+79513645566' onClick={() => setMenuOpen(false)}>
          +7 (951) 364-55-66
        </Link>
      </div>
    </header>
  );
}
