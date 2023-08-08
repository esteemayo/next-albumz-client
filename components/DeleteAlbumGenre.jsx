import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { deleteAlbum } from '@/services/albumService';
import { deleteGenre } from '@/services/genreService';

import styles from '@/styles/DeleteAlbumGenre.module.scss';

const DeleteGenreAlbum = ({
  type,
  title,
  albumId,
  genreId,
  closeModal,
  setGenreList,
  setAlbumList,
 }) => {
  const handleDelete = async () => {
    if (type === 'genre') {
      await removeGenre();
    } else if (type === 'album') {
      await removeAlbum();
    }
    closeModal(true);
  };

  const removeGenre = async () => {
    try {
      await deleteGenre(genreId);
      setGenreList((prev) => prev.filter((item) => item._id !== genreId));
      return toast.success('Genre deleted successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const removeAlbum = async () => {
    try {
      await deleteAlbum(albumId);
      setAlbumList((prev) => prev.filter((item) => item._id !== albumId));
      return toast.success('Album deleted successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>{title}</h3>
        <div className={styles.btnBox}>
          <button
            onClick={() => closeModal(true)}
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
