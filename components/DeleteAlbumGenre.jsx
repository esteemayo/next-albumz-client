import { useCallback } from 'react';
import styles from '@/styles/DeleteAlbumGenre.module.scss';

const DeleteGenreAlbum = ({
  type,
  title,
  actionId,
  onAction,
  onClose,
 }) => {
  const handleDelete = useCallback(async () => {
    if (type === 'genre') {
      onAction?.(actionId);
    } else if (type === 'album') {
      onAction();
    }
    onClose();
  }, [onClose]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>{title}</h3>
        <div className={styles.btnBox}>
          <button
            onClick={onClose}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.btn} ${styles.btnDelete}`}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGenreAlbum;
