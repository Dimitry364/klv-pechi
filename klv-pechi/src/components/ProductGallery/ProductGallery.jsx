'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Keyboard, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';

export default function ProductGallery({ images = [], title = '' }) {
  const [thumbs, setThumbs] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const overlayRef = useRef(null);

  const open = useCallback((index) => {
    setStartIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // фокус на оверлей, чтобы ловить Esc
  useEffect(() => {
    if (isOpen) overlayRef.current?.focus();
  }, [isOpen]);

  const thumbsSwiper = thumbs && !thumbs.destroyed ? thumbs : null;

  return (
    <div className={styles.gallery}>
      {/* Основной слайдер */}
      <Swiper
        modules={[Navigation, Thumbs, Keyboard, Zoom]}
        navigation
        keyboard={{ enabled: true }}
        lazyPreloadPrevNext={1}
        zoom={{ maxRatio: 2 }}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.productSwiper}
        observer
        observeParents
      >
        {images.map((src, i) => (
          <SwiperSlide key={`${src}-${i}`} onClick={() => open(i)}>
            <div className={styles.slideBox}>
              <div className='swiper-zoom-container'>
                <Image
                  src={src}
                  alt={`${title} — фото ${i + 1}`}
                  fill
                  sizes='(max-width: 900px) 92vw, 560px'
                  className={styles.img}
                  priority={i === 0}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Превью */}
      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbs}
        spaceBetween={8}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className={styles.thumbsSwiper}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={`thumb-${src}-${idx}`}>
            <div className={styles.thumb}>
              <Image
                src={src}
                alt={`${title} — полноэкранное фото ${idx + 1}`}
                fill
                sizes='120px'
                className={styles.img}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Лайтбокс */}
      {isOpen && (
        <div
          ref={overlayRef}
          className={styles.lightbox}
          role='dialog'
          aria-modal='true'
          tabIndex={-1}
          onClick={close}
          onKeyDown={(e) => e.key === 'Escape' && close()}
        >
          <div
            className={styles.lightboxDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Keyboard, Zoom]}
              navigation
              keyboard={{ enabled: true }}
              initialSlide={startIndex}
              lazyPreloadPrevNext={1}
              zoom={{ maxRatio: 3 }}
              className={styles.lightboxSwiper}
              observer
              observeParents
            >
              {images.map((src, idx) => (
                <SwiperSlide key={`full-${src}-${idx}`}>
                  <div className={styles.lightboxSlide}>
                    <div className='swiper-zoom-container'>
                      <Image
                        src={src}
                        alt={`${title} — полноэкранное фото ${idx + 1}`}
                        fill
                        sizes='(max-width: 1200px) 96vw, 1200px'
                        className={styles.img}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={styles.lightboxClose}
              onClick={close}
              aria-label='Закрыть'
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
