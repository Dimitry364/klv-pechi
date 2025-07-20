'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './LazyVideo.module.scss';

export default function LazyVideo() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intObs = new IntersectionObserver(([entery]) => {
      entery.isIntersecting && setVisible(true), { rootMargin: '200px' };
    });
    ref.current && intObs.observe(ref.current);
    return () => ref.current && intObs.disconnect();
  }, []);

  return visible ? (
    <video
      className={styles.video}
      ref={ref}
      width={300}
      height={533}
      poster='/video/video_chasha_poster.jpg'
      muted
      autoPlay
      loop
      playsInline
    >
      <source src='/video/video_chasha.webm' type='video/webm' />
      <source src='/video/video_chasha.mp4' type='video/mp4' />
    </video>
  ) : (
    <img
      className={styles.img}
      ref={ref}
      src='/video/video_chasha_poster.webp'
      width={300}
      height={533}
      alt='Процесс обжига'
      loading='lazy'
    />
  );
}
