import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styles from '@/styles/Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  const overlayClasses = useMemo(() => {
    return showModal ?
      `${styles.overlay} ${styles.show}` :
      styles.overlay;
  }, [showModal]);

  const modalClasses = useMemo(() => {
    return children.props.type === 'genre' ?
      `${styles.modal} ${styles.modalGenre}` :
      `${styles.modal}`;
  }, [children.props.type]);

  const bodyClasses = useMemo(() => {
    return children.props.type === 'genre' ? 
      `${styles.modal__bodyGenre}` : 
      `${styles.modal__body}`;
  }, [children.props.type]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <aside className={overlayClasses}>
      <div className={styles.container}>
        <div className={modalClasses}>
          <header className={styles.modal__header}>
            <div className={styles.modal__iconWrapper}>
              <CloseOutlinedIcon
                onClick={handleClose}
                className={styles.modal__closeIcon}
              />
            </div>
          </header>
          <div className={bodyClasses}>{children}</div>
        </div>
      </div>
    </aside>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Modal;
