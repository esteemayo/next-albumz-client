import Reviews from '@/components/Reviews';
import ReviewForm from '@/components/ReviewForm';
import SingleAlbumHero from '@/components/SingleAlbumHero';
import AlbumDescription from '@/components/AlbumDescription';

import styles from '@/styles/SingleAlbum.module.scss';

const SingleAlbum = () => {
  return (
    <section className={styles.container}>
      <SingleAlbumHero />
      <AlbumDescription />
      <ReviewForm />
      <Reviews />
    </section>
  );
};

export default SingleAlbum;
