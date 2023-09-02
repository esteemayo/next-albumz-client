import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import styles from '@/styles/DialogBox.module.scss';

const DialogBox = ({ isOpen, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  const dialogClasses = useMemo(() => {
    return isOpen ?
      `${styles.dialog} ${styles.show}` :
      styles.dialog;
  }, [isOpen]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <section className={dialogClasses}>
      <div className={styles.dialog__container}>
        <div className={styles.dialog__modal}>
          {children}
        </div>
      </div>
    </section>
  );
};

DialogBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
};

export default DialogBox;
