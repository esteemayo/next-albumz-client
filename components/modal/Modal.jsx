import PropTypes from 'prop-types';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useMemo } from 'react';

import styles from '@/styles/Modal.module.scss';

const Modal = ({ onClose, children }) => {
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

  return (
    <aside className={styles.overlay}>
      <div className={modalClasses}>
        <header className={styles.modal__header}>
          <div className={styles.modal__iconWrapper}>
            <CloseOutlinedIcon
              onClick={onClose}
              className={styles.modal__closeIcon}
            />
          </div>
        </header>
        <div className={bodyClasses}>{children}</div>
      </div>
    </aside>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Modal;
