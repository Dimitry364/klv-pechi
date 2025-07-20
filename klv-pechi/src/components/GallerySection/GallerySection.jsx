'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import GalleryModal from '../GalleryModal/GalleryModal';
import styles from './GallerySection.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function GallerySection({ albums }) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0); // индекс кадра для открытия
  const swiperRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const flatPhotos = useMemo(() => {
    return albums.flatMap(({ slug, title, photos }) =>
      photos.map((src) => ({ src, albumTitle: title, albumSlug: slug }))
    );
  }, [albums]);

  const handleOpen = (slug) => {
    const alb = albums.find((a) => a.slug === slug);

    if (!alb) return;

    const idx = flatPhotos.findIndex(
      (p) => p.src === alb.photos[0] && p.albumSlug === slug
    );
    setStart(idx);
    setOpen(true);
  };

  if (albums.length === 0) {
    return (
      <section className={styles.gallerySection}>
        <h2 className={styles.title}>Фотогалерея</h2>
        <p className={styles.empty}>Фотографии пока не добавлены.</p>
      </section>
    );
  }
  return (
    <section id='gallery' className={`${styles.gallerySection} gallerySection`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Галерея</h2>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Keyboard]}
          navigation
          keyboard
          slidesPerView='auto'
          slidesPerGroup={1}
          spaceBetween={24}
          grabCursor
          watchSlidesProgress
          centeredSlides={false}
          className={`${styles.albumSwiper} albumSwiper`}
        >
          {albums.map((alb) => (
            <SwiperSlide
              key={alb.slug}
              className={styles.albumCard}
              onClick={() => handleOpen(alb.slug)}
            >
              <Image
                className={styles.image}
                width={480}
                height={380}
                src={alb.cover}
                alt={alb.title}
                loading='lazy'
              />
              <span className={styles.counter}>{alb.photos.length} фото</span>
              <span className={styles.caption}>{alb.description}</span>
            </SwiperSlide>
          ))}
        </Swiper>
        {open && (
          <GalleryModal
            startIndex={start}
            flatPhotos={flatPhotos}
            onClose={() => setOpen(false)}
          />
        )}
        {isClient && window.innerWidth < 600 && (
          <div className={styles.mobileArrows}>
            <button onClick={() => swiperRef.current?.slidePrev()}>←</button>
            <button onClick={() => swiperRef.current?.slideNext()}>→</button>
          </div>
        )}
      </div>
    </section>
  );
}
