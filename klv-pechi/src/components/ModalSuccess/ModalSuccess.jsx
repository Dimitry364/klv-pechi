import { FaCheckCircle } from 'react-icons/fa';
import styles from './ModalSuccess.module.scss';

export default function ModalSuccess({ onClose }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <FaCheckCircle className={styles.icon} />
        <p className={styles.paragraph}>Товар добавлен в корзину</p>
        <button className={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
