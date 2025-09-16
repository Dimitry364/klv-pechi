'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './GalleryModal.module.scss';

export default function GalleryModal({ onClose, startIndex, flatPhotos }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    //запрещаем скролл, пока открыта модалка, добавляем слушатель, нажали esc - закрыли
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      // при закрытии возвращаем управление скроллом, убираем слушатель
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]); // эффект выполняется один раз при открытии и чистится при закрытии

  console.log(flatPhotos);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      {/* предотвращаем закрытие блока при на жатии на него */}
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>

        <Swiper
          initialSlide={startIndex}
          modules={[Navigation, Keyboard]}
          navigation
          keyboard
          loop
          className={styles.photoSwiper}
        >
          {flatPhotos.map(({ src, description }, index) => (
            <SwiperSlide key={index} className={styles.photoSlide}>
              <img src={src} className={styles.image} alt={description} />
              <div className='swiper-lazy-preloader' />
              <p className={styles.desc}>{description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>,
    document.body
  );
}
