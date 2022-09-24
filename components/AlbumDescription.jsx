import styles from '@/styles/AlbumDescription.module.scss';

const AlbumDescription = () => {
  return (
    <section className={styles.description}>
      <div className={styles.left}>
        <div className={styles.album__wrapper}>
          <h2 className={styles.album__heading}>About album</h2>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Artist</span>
            <span>Wizkid</span>
          </div>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Title</span>
            <span>Made in lagos</span>
            </div>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Genre</span>
            <span>Afro pop</span>
          </div>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Year of Release</span>
            <span>2020</span>
          </div>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Record Label</span>
            <span>Star boy</span>
          </div>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Number of Tracks</span>
            <span>18</span>
          </div>
          <div className={styles.album__details}>
            <span>Icon</span>
            <span>Ratings</span>
            <span>5.0</span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightWrapper}>
          <h2 className={styles.album__heading}>About made in lagos album</h2>
          <p className={styles.album__info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor leo eu enim ultricies, id maximus quam elementum. Morbi sit amet malesuada quam. 
            Nam molestie mauris eget tristique bibendum. Morbi euismod mi non dolor efficitur congue. Proin eu risus nibh. Fusce nulla nisi, feugiat nec arcu blandit, pretium condimentum ex. Donec rutrum est sed vehicula sagittis. 
            Nulla eu enim non arcu tempus tempor nec id eros. In fermentum, dolor quis euismod dignissim, ipsum risus dignissim elit, sit amet luctus mauris massa ac erat. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlbumDescription;
