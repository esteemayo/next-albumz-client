import Reviews from '@/components/Reviews';
import ReviewForm from '@/components/ReviewForm';
import RelatedAlbums from '@/components/RelatedAlbums';
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
      <RelatedAlbums />
    </section>
  );
};

export default SingleAlbum;
