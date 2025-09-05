'use client';

import Image from 'next/image';
import styles from './ProductDetails.module.scss';
import { useState } from 'react';

import { useCart } from '@/context/CartContext';
import ModalSuccess from '../ModalSuccess/ModalSuccess';
import ProductGallery from '../ProductGallery/ProductGallery';

function ProductDetails({ product }) {
  const { title, image, images, material, description, options, specs } =
    product;

  const normalizeImages = (val, fallback) => {
    if (Array.isArray(val)) return val;

    if (typeof val === 'string') {
      // пробуем распарсить json - строку
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch (_) {
        // если не валидный json режем по запятым и чистим
        return val
          .split(',')
          .map((s) => s.replace(/[\[\]"]/g, '').trim())
          .filter(Boolean);
      }
    }
    return fallback ? [fallback] : [];
  };

  const gallery = normalizeImages(images, image);

  const [selectedOption, setSelectedOption] = useState(options[0]?.values[0]);

  const { addToCart, added, setAdded } = useCart();

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.topSection}>
        <div className={styles.imageBlock}>
          <ProductGallery images={gallery} title={title} />
        </div>

        <div className={styles.infoBlock}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.price}>
            {selectedOption.price.toLocaleString('ru-RU')} ₽
          </div>

          {options?.[0]?.values?.length > 0 && (
            <div className={styles.options}>
              <label className={styles.optionTitle}>Комплектация:</label>
              <select
                className={styles.select}
                value={selectedOption.label}
                onChange={(e) =>
                  setSelectedOption(
                    options[0].values?.find(
                      (opt) => opt.label === e.target.value
                    )
                  )
                }
              >
                {options[0].values.map((opt) => (
                  <option key={opt.label} value={opt.label}>
                    {opt.label} — {opt.price.toLocaleString('ru-RU')} ₽
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            className={styles.buyButton}
            onClick={() => addToCart(product, selectedOption)}
          >
            Добавить в корзину
          </button>
          <table className={styles.specsTable}>
            <tbody>
              {material && (
                <tr>
                  <td>Материал</td>
                  <td>{material}</td>
                </tr>
              )}
              {specs &&
                Object.entries(specs).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.description}>
        <h2 className={styles.descriptionTitle}>Описание</h2>

        <div className={styles.descriptionBlock}>
          <h3 className={styles.subsectionTitle}>Назначение</h3>
          <p className={styles.paragraph}>{description.intro}</p>
        </div>

        <div className={styles.descriptionBlock}>
          <h3 className={styles.subsectionTitle}>Преимущества</h3>
          <p className={styles.paragraph}>{description.benefits}</p>
          <p className={styles.paragraph}>{description.conclusion}</p>
        </div>

        {description.equipment.length > 0 ? (
          <div className={styles.descriptionBlock}>
            <h3 className={styles.subsectionTitle}>Комплектация</h3>
            <ul className={styles.equipmentList}>
              {description.equipment.map((item, i) => (
                <li key={i} className={styles.equipmentItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      {added && <ModalSuccess onClose={() => setAdded(false)} />}
    </div>
  );
}

export default ProductDetails;
