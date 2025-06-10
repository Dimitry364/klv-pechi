'use client';

import styles from './GallerySection.module.scss';

export default function GallerySection({ images }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Галерея</h2>
      {images.length === 0 ? (
        <p className={styles.empty}>Фотографии пока не добавлены.</p>
      ) : (
        <div className={styles.grid}>
          {images.map((img) => (
            <div key={img._id} className={styles.card}>
              <img src={img.url} alt={img.alt || 'Фото'} loading='lazy' />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
