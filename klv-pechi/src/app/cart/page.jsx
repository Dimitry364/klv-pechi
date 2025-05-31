'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import styles from './CartPage.module.scss';
import PhoneInput from 'react-phone-input-2';
import Image from 'next/image';
import 'react-phone-input-2/lib/style.css';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.option.price, 0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('telegram');
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || cart.length === 0) {
      alert(
        'Пожалуйста, заполните имя, телефон и убедитесь, что корзина не пуста.'
      );
      return;
    }

    const order = {
      name,
      phone,
      method,
      comment,
      items: cart,
      total,
    };

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

    const res = await fetch(
      `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (res.ok) {
      setSuccess(true);
      clearCart();
      setName('');
      setPhone('');
      setComment('');
    } else {
      alert('Ошибка при отправке заявки. Попробуйте позже.');
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

                <button className={styles.submit} type='submit'>
                  Оформить заказ
                </button>

                {success && (
                  <p className={styles.success}>✅ Заявка успешно отправлена</p>
                )}
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
    </div>
  );
}
