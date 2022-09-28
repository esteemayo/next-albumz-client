import styles from '@/styles/DeleteAlbumGenre.module.scss';

const DeleteGenreAlbum = ({ title, closeModal }) => {
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
            onClick={()=> {
              console.log('album/genre deleted');
              closeModal(true);
            }}
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
