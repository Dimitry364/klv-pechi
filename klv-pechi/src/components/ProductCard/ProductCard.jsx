'use client';

import styles from './ProductCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';

function ProductCard({ product }) {
  const { slug, image, title, material, options, specs } = product;

  // Получаем первую цену из options, если она есть
  const price = options?.[0]?.values?.[0]?.price ?? null;

  return (
    <div className={styles.card}>
      <Link href={`/product/${slug}`} className={styles.link}>
        <div className={styles.media}>
          <Image
            className={styles.image}
            src={image}
            alt={title}
            width={300}
            height={300}
            priority
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <ul className={styles.specs}>
            {material && <li>Материал: {material}</li>}
            {specs?.['Вес, кг'] && <li>Вес: {specs['Вес, кг']} кг</li>}
            {specs?.['Объем парного помещения, м3'] && (
              <li>
                Объем парного помещения: {specs['Объем парного помещения, м3']}{' '}
                м³
              </li>
            )}
            {specs?.['Вид дверки печи'] && (
              <li>Вид дверки: {specs['Вид дверки печи']}</li>
            )}
          </ul>
          <div className={styles.footer}>
            <div className={styles.price}>
              {options?.[0].values?.length > 1 ? 'от ' : ''}
              {price.toLocaleString('ru-RU')} ₽
            </div>
            <button className={styles.cta}>Подробнее</button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
