import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import styles from '@/styles/DialogBox.module.scss';

const DialogBox = ({ isOpen, children }) => {
  const dialogClasses = useMemo(() => {
    return isOpen ?
      `${styles.dialog} ${styles.show}` :
      styles.dialog;
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
