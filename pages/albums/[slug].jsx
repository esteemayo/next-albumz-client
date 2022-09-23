import SingleAlbumHero from '@/components/SingleAlbumHero';
import styles from '@/styles/SingleAlbum.module.scss';

const SingleAlbum = () => {
  return (
    <section className={styles.container}>
      <SingleAlbumHero />
    </section>
  );
};

export default SingleAlbum;
