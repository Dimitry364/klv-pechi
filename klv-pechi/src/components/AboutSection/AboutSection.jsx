'use client';

import styles from './AboutSection.module.scss';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id='about'
      className={styles.section}
      aria-labelledby='about-title'
    >
      <motion.div
        ref={ref}
        className={styles.sectionBox}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h2 id='about-title' className={styles.sectionTitle}>
          О нас
        </h2>

        <div className={styles.grid}>
          <div className={styles.textBlock}>
            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Мы не идём на поводу у модных тенденций — мы их создаём. Мы не
              производим дешёвые одноразовые изделия ради сиюминутной прибыли.
              Наши <strong>печи для бани и сауны</strong> приносят радость от
              использования — и этим хочется делиться.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Только лучшие материалы и оптимальные технические решения:
              жаропрочная нержавеющая сталь <strong>AISI&nbsp;321</strong>,
              толщина <strong>2–3&nbsp;мм</strong>.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Все вопросы решаем в пользу клиента и всегда готовы помочь —
              консультация, подбор, сервис и{' '}
              <strong>доставка по всей России</strong>.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Наши печи созданы для тех, кто хочет получить изделие на
              десятилетия, а не менять их каждые три года.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Честность, качество, надёжность — во всём.
            </motion.p>
          </div>

          {/* Факты как семантический dl */}
          <dl className={styles.infoBox}>
            <div className={styles.fact}>
              <dt className={styles.label}>Толщина стали</dt>
              <dd className={styles.value}>2–3 мм</dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.label}>Марка</dt>
              <dd className={styles.value}>AISI 321</dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.label}>Гарантия</dt>
              <dd className={styles.value}>5 лет</dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.label}>Производство</dt>
              <dd className={styles.value}>в России</dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
