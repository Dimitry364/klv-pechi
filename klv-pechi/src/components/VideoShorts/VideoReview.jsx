'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoReview.module.scss';

export default function VideoReview({
  title = 'Видеообзор печи',
  poster,
  mp4,
  webm,
  playButton,
  duration = '6:50',
  chips = ['AISI 321', 'Производство в России', 'Гарантия 5 лет'],
}) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);

  // блокируем скролл под модалкой
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // автоплей внутри модалки
  useEffect(() => {
    if (!open || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [open]);

  // Esc для закрытия
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section className={styles.wrap} aria-label='Видеообзор печи'>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.lead}>
          В этом видео показываем печи «Колывань»: из чего они сделаны, как
          собираются и за счёт чего дают быстрый прогрев и чистый жар. Покажем
          внешнее исполнение, конструкцию каменки и дверцы.
        </p>
        <div className={styles.chips}>
          {chips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>

      {/* Карточка с постером */}
      <button
        className={styles.card}
        onClick={() => setOpen(true)}
        aria-label={`Смотреть видео, ${duration}`}
      >
        <img src={poster} alt='' loading='lazy' className={styles.poster} />
        <span className={styles.badge}>{duration}</span>
        <img src={playButton} alt='' className={styles.playButton} />
      </button>

      {/* Модалка */}
      {open && (
        <div
          className={styles.modal}
          role='dialog'
          aria-modal='true'
          onClick={() => setOpen(false)}
        >
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label='Закрыть'
            >
              ×
            </button>

            {
              <video
                ref={videoRef}
                className={styles.video}
                controls
                playsInline
                preload='metadata'
                poster={poster}
              >
                {webm && <source src={webm} type='video/webm' />}
                {mp4 && <source src={mp4} type='video/mp4' />}
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            }
          </div>
        </div>
      )}
    </section>
  );
}
