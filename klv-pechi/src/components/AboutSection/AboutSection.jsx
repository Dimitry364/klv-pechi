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
      transition: {
        staggerChildren: 0.3,
      },
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
    <section id='about' className={styles.section}>
      <motion.div
        ref={ref}
        className={styles.sectionBox}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h2 className={styles.sectionTitle}>О нас</h2>

        <div className={styles.grid}>
          <div className={styles.textBlock}>
            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Мы создаём печи, которые не просто греют воздух — они греют душу.
              Для нас баня — это не бытовая необходимость, а культура, традиция
              и часть русской идентичности.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              <strong>Колывань</strong> — это производитель, в основе которого
              лежит инженерная точность и глубокое уважение к делу. Мы
              используем жаропрочную нержавеющую сталь AISI 321 толщиной 2–3 мм,
              применяем аргонную сварку и собираем печи на собственном
              промышленном оборудовании. Каждая единица проходит ручной контроль
              качества.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Конструкции запатентованы и разработаны таким образом, чтобы
              обеспечить максимальную теплоотдачу, равномерный прогрев, и полное
              сгорание топлива без перегрева корпуса. Камни располагаются
              отдельно от металла, а значит, печи служат дольше и безопаснее.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Мы не идём на компромиссы: ни в материалах, ни в сборке, ни в
              обслуживании. Для нас важно, чтобы каждая печь, вышедшая из нашего
              цеха, была эталоном надёжности и тепла.
            </motion.p>

            <motion.p variants={paragraphVariants} className={styles.paragraph}>
              Если вы цените честный подход, инженерную основательность и ту
              самую атмосферу настоящей русской бани — вы на своём месте. Добро
              пожаловать в <strong>Колывань</strong>.
            </motion.p>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.fact}>
              <span className={styles.label}>Толщина стали</span>
              <span className={styles.value}>2–3 мм</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.label}>Марка</span>
              <span className={styles.value}>AISI 321</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.label}>Гарантия</span>
              <span className={styles.value}>5 лет</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.label}>Производство</span>
              <span className={styles.value}>в России</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
