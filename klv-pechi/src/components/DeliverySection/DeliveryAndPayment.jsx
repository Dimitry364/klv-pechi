'use client';
import styles from './DeliveryAndPayment.module.scss';

const DeliveryAndPayment = () => {
  return (
    <section className={styles.deliverySection} id='delivery'>
      <div className={styles.sectionBox}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Доставка и оплата</h2>
          <p className={styles.subtitle}>Работаем по всей России</p>
        </div>

        <div className={styles.content}>
          <div className={styles.blocksWrapper}>
            <article className={styles.textBlock}>
              <h3 className={styles.blockTitle}>Доставка</h3>
              <p className={styles.blockText}>
                Отправляем продукцию транспортными компаниями: ПЭК, СДЭК,
                Деловые Линии и другие. Доставка по тарифам ТК, точные сроки
                уточняются при отправке. Мы не накручиваем стоимость доставки и
                не скрываем условия. Всё прозрачно — вы видите, сколько стоит
                товар и сколько уходит на логистику.
              </p>
            </article>

            <article className={styles.textBlock}>
              <h3 className={styles.blockTitle}>Самовывоз</h3>
              <p className={styles.blockText}>
                Новосибирская область, рп. Колывань
                <br />
                Улица Ленина, 88Б/2
              </p>
              <a
                href='https://go.2gis.com/smvBA'
                className={styles.mapLink}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Открыть локацию в 2ГИС'
              >
                Открыть в 2ГИС →
              </a>
            </article>

            <article className={styles.paymentBlock}>
              <div className={styles.iconPlaceholder}>💳</div>
              <h3 className={styles.blockTitle}>Банковской картой</h3>
              <p className={styles.blockText}>
                Мы придерживаемся простых и понятных условий: Оплата при
                получении / Перевод на карту / Онлайн-оплата по запросу
              </p>
            </article>

            <article className={styles.paymentBlock}>
              <div className={styles.iconPlaceholder}>📄</div>
              <h3 className={styles.blockTitle}>Юридическим лицам</h3>
              <p className={styles.blockText}>
                Для покупки от юридического лица мы выставим счёт и предоставим
                все необходимые закрывающие документы
              </p>
            </article>
          </div>

          <div className={styles.videoBlock}>
            <div className={styles.videoPlaceholder}>Видео заглушка</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryAndPayment;
