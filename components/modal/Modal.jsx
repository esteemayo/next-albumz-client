import PropTypes from 'prop-types';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styles from '@/styles/Modal.module.scss';

const Modal = ({ onClose, children }) => {
  return (
    <aside className={styles.overlay}>
      <div className={
        children.props.type === 'genre' ?
        `${styles.modal} ${styles.modalGenre}` :
        `${styles.modal}`}
      >
        <header className={styles.modal__header}>
          <div className={styles.modal__iconWrapper}>
            <CloseOutlinedIcon
              className={styles.modal__closeIcon}
              onClick={onClose}
            />
          </div>
        </header>
        <div className={
          children.props.type === 'genre' ? 
          `${styles.modal__bodyGenre}` : 
          `${styles.modal__body}`}
        >
          {children}
        </div>
      </div>
    </aside>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default Modal;
