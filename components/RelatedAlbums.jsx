import RelatedAlbumCard from './RelatedAlbumCard';
import styles from '@/styles/RelatedAlbums.module.scss';

const RelatedAlbums = () => {
  return (
    <section className={styles.related}>
      <div className={styles.related__wrapper}>
        <h6 className={styles.related__header}>Related Albums</h6>
        <div className={styles.related__container}>
          <RelatedAlbumCard />
          <RelatedAlbumCard />
          <RelatedAlbumCard />
        </div>
      </div>
    </section>
  );
};

export default RelatedAlbums;
