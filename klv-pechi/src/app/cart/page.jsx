'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import styles from './CartPage.module.scss';
import { telegramSender } from '@/lib/TelegramSender';
import PhoneInput from 'react-phone-input-2';
import Image from 'next/image';
import 'react-phone-input-2/lib/style.css';
import Modal from '@/components/Modal/Modal';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.option.price, 0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('telegram');
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name || !phone || cart.length === 0) {
      setIsLoading(false);
      alert(
        'Пожалуйста, заполните имя, телефон и убедитесь, что корзина не пуста.'
      );
      return;
    }

    const message = `
<b>🧾 Новый заказ</b>\n
👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> +${phone}
💬 <b>Способ связи:</b> ${method}
📝 <b>Комментарий:</b> ${comment || '—'}

🛒 <b>Товары:</b>\n${cart
      .map(
        (item) =>
          `• ${item.product.title} — ${
            item.option.label
          } (${item.option.price.toLocaleString('ru-RU')} ₽)`
      )
      .join('\n')}

💰 <b>Итого:</b> ${total.toLocaleString('ru-RU')} ₽
`;

    try {
      await telegramSender.sendMessage(message);
      setSuccess(true);
      clearCart();
      setName('');
      setPhone('');
      setComment('');
    } catch (error) {
      console.error('Ошибка при отправке в Telegram:', error);
      alert('Ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.checkoutContainer}>
        {cart.length === 0 ? (
          <p>Корзина пуста.</p>
        ) : (
          <div className={styles.content}>
            {/* Форма */}
            <div className={styles.formSection}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.checkoutTitle}>Оформление заказа</h2>
                <p className={styles.checkoutSubtitle}>
                  Пожалуйста, укажите свои данные — мы свяжемся с вами удобным
                  способом
                </p>
                <input
                  type='text'
                  placeholder='Ваше имя'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  autoComplete='name'
                  required
                />
                <PhoneInput
                  country='ru'
                  onlyCountries={['ru']}
                  enableAreaCodes
                  disableDropdown
                  disableCountryCode={false}
                  countryCodeEditable={false}
                  value={phone}
                  onChange={setPhone}
                  inputClass={styles.phoneInput}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: false,
                    autoComplete: 'tel',
                  }}
                  isValid={(value) =>
                    value.startsWith('7') &&
                    value.replace(/\D/g, '').length === 11
                  }
                />

                <div>
                  <label>Предпочтительный способ связи:</label>
                  <div className={styles.radioGroup}>
                    <label
                      className={styles.radioOption}
                      data-selected={method === 'telegram' ? 'telegram' : ''}
                    >
                      <input
                        className={styles.radioInput}
                        type='radio'
                        name='method'
                        value='telegram'
                        checked={method === 'telegram'}
                        onChange={(e) => setMethod(e.target.value)}
                      />
                      <span>Telegram</span>
                    </label>
                    <label
                      className={styles.radioOption}
                      data-selected={method === 'whatsapp' ? 'whatsapp' : ''}
                    >
                      <input
                        className={styles.radioInput}
                        type='radio'
                        name='method'
                        value='whatsapp'
                        checked={method === 'whatsapp'}
                        onChange={(e) => setMethod(e.target.value)}
                      />
                      <span>WhatsApp</span>
                    </label>
                    <label
                      className={styles.radioOption}
                      data-selected={method === 'phone' ? 'phone' : ''}
                    >
                      <input
                        className={styles.radioInput}
                        type='radio'
                        name='method'
                        value='phone'
                        checked={method === 'phone'}
                        onChange={(e) => setMethod(e.target.value)}
                      />
                      <span>Звонок</span>
                    </label>
                  </div>
                </div>

                <textarea
                  className={styles.textarea}
                  placeholder='Комментарий к заказу'
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  className={styles.submit}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? 'Отправляем...' : 'Оформить заказ'}
                </button>
              </form>
            </div>

            {/* Корзина */}
            <div className={styles.cartSection}>
              <h2 className={styles.cartTitle}>Корзина</h2>
              <div className={styles.cartItems}>
                {cart.map((item, i) => (
                  <div key={i} className={styles.cartItem}>
                    <Image
                      className={styles.cartItemImage}
                      src={item.product.image}
                      alt={item.product.title}
                      width={90}
                      height={90}
                      priority
                    />
                    <div className={styles.cartItemInfo}>
                      <div className={styles.cartItemTitle}>
                        {item.product.title} — {item.option.label}
                      </div>
                      <div className={styles.cartItemPrice}>
                        {item.option.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(i)}
                      className={styles.removeButton}
                    >
                      удалить
                    </button>
                  </div>
                ))}
              </div>
              <p className={styles.total}>
                Итого: {total.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
        )}
      </div>
      {(success || error) && (
        <Modal
          message={
            success
              ? 'Спасибо за заявку! Мы скоро с вами свяжемся.'
              : 'Ошибка при отправке. Попробуйте позже.'
          }
          onClose={() => {
            setSuccess(false);
            setError(null);
          }}
        />
      )}
    </div>
  );
}
