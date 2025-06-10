'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './FeedbackSection.module.scss';
import { FaTelegramPlane, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { telegramSender } from '@/lib/TelegramSender';
import Modal from '../Modal/Modal';

export default function FeedbackSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [method, setMethod] = useState('telegram');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const isValid =
      phone.startsWith('7') && phone.replace(/\D/g, '').length === 11;

    if (!name || !isValid) {
      setIsLoading(false);
      alert('Пожалуйста, введите имя и корректный телефон');
      return;
    }

    const message = `
<b>🧾 Вопрос с сайта</b>\n
👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> +${phone}
💬 <b>Способ связи:</b> ${method}
📝 <b>Комментарий:</b> ${comment || '—'}`;

    try {
      telegramSender.sendMessage(message);
      setSuccess(true);
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
    <section id='contact' className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Остались вопросы?</h2>
          <p className={styles.subtitle}>
            Напишите в Telegram / WhatsApp или оставьте контакт — мы всё
            расскажем.
          </p>

          <div className={styles.contacts}>
            <a
              href='https://t.me/+79513645566'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTelegramPlane size={24} /> Telegram
            </a>
            <a
              href='https://wa.me/79513645566'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaWhatsapp size={24} /> WhatsApp
            </a>
            <a href='tel:+79513645566'>
              <FaPhone size={22} /> Позвонить
            </a>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Ваше имя *'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            required
          />
          <PhoneInput
            country='ru'
            onlyCountries={['ru']}
            disableDropdown
            countryCodeEditable={false}
            value={phone}
            onChange={setPhone}
            inputClass={styles.phoneInput}
            inputProps={{
              required: true,
              placeholder: '+7 (999) 123-45-67',
              autoComplete: 'tel',
            }}
            isValid={(value) =>
              value.startsWith('7') && value.replace(/\D/g, '').length === 11
            }
          />

          <div className={styles.methods}>
            <label>
              <input
                type='radio'
                name='method'
                value='telegram'
                checked={method === 'telegram'}
                target='_blank'
                onChange={(e) => setMethod(e.target.value)}
              />
              Telegram
            </label>
            <label>
              <input
                type='radio'
                name='method'
                value='whatsapp'
                checked={method === 'whatsapp'}
                target='_blank'
                onChange={(e) => setMethod(e.target.value)}
              />
              WhatsApp
            </label>
            <label>
              <input
                type='radio'
                name='method'
                value='phone'
                checked={method === 'phone'}
                onChange={(e) => setMethod(e.target.value)}
              />
              Звонок
            </label>
          </div>

          <textarea
            className={styles.textarea}
            placeholder='Комментарий'
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Отправляем...' : 'Отправить'}
          </button>
        </form>
      </div>
      {(success || error) && (
        <Modal
          message={
            success
              ? `Спасибо за заявку! Мы скоро с вами свяжемся.`
              : 'Ошибка при отправке. Попробуйте позже.'
          }
          onClose={() => {
            setSuccess(false);
            setError(null);
          }}
        />
      )}
    </section>
  );
}
