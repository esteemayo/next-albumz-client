import PropTypes from 'prop-types';
import { useCallback } from 'react';

import styles from '@/styles/DeleteAlbumGenre.module.scss';

const DeleteGenreAlbum = ({
  title,
  actionId,
  onAction,
  onClose,
 }) => {
  const handleDelete = useCallback(async () => {
    onAction?.(actionId);
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

DeleteGenreAlbum.propTypes = {
  title: PropTypes.string.isRequired,
  actionId: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteGenreAlbum;
