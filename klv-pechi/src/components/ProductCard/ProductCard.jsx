'use client';

import styles from './ProductCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';

//получаем объект specs и список возможных названий полей,
//возвращаем первое найденное значение
function getSpec(specs, keys) {
  if (!specs) return null; //
  for (const k of keys) {
    const v = specs[k];
    if (v !== undefined && v !== null && String(v).trim() !== '') return v;
  }
  return null;
}

function ProductCard({ product }) {
  const { slug, image, title, material, options, specs } = product;

  // Получаем первую цену из options, если она есть
  const price = options?.[0]?.values?.[0]?.price ?? null;
  const weight = getSpec(specs, ['Вес, кг', 'Масса печи, кг']);
  const volume = getSpec(specs, [
    'Объем парного помещения, м3',
    'Объем парильного помещения, м³',
  ]);
  const door = getSpec(specs, ['Вид дверки печи', 'Тип дверцы']);

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
            {weight !== null && <li>Вес: {weight} кг</li>}
            {volume !== null && <li>Объем парного помещения: {volume} м³</li>}
            {door && <li>Вид дверки: {door}</li>}
          </ul>
          <div className={styles.footer}>
            <div className={styles.price}>
              {(options?.[0]?.values?.length) > 1 ? 'от ' : ''}
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
