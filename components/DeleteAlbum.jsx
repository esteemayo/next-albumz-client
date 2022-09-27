import styles from '@/styles/DeleteAlbum.module.scss';

const DeleteAlbum = ({ closeModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Discard album?</h3>
        <div className={styles.btnBox}>
          <button
            onClick={() => closeModal(true)}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancel
          </button>
          <button
            onClick={()=> {
              console.log('album deleted');
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

export default DeleteAlbum;
