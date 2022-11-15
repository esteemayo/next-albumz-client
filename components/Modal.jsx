import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from '@/styles/Modal.module.scss';

const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.overlay} onClick={() => onClose(false)}>
      <div className={
        children.props.type === 'genre' ?
        `${styles.modal} ${styles.modalGenre}` : 
        `${styles.modal}`}
      >
        <header className={styles.modal__header}>
          <div className={styles.modal__iconWrapper}>
            <CloseOutlinedIcon 
              className={styles.modal__closeIcon} 
              onClick={() => onClose(false)} 
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
    </div>
  );
};

export default Modal;
