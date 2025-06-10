'use client';
import styles from './Modal.module.scss';

export default function Modal({ message, onClose }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.paragraph}>{message}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
