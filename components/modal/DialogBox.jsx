import PropTypes from 'prop-types';
import styles from '@/styles/DialogBox.module.scss';

const DialogBox = ({ children }) => {
  return (
    <section className={styles.dialog}>
      <div className={styles.dialog__modal}>
        {children}
      </div>
    </section>
  );
};

export default DialogBox;
