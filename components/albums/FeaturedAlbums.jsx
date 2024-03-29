import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';

import Spinner from '@/components/Spinner';

import styles from '@/styles/FeaturedAlbums.module.scss';

const AlbumCard = lazy(() => import('@/components/card/AlbumCard'));

const FeaturedAlbums = ({ albums }) => {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.heading__secondary}>Featured albums</h2>
        <div className={styles.wrapper}>
          <Suspense fallback={<Spinner />}>
            {albums?.map((item) => {
              return <AlbumCard key={item._id} album={item} />;
            })}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

FeaturedAlbums.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.array.isRequired,
      info: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      ratingsAverage: PropTypes.number.isRequired,
      ratingsQuantity: PropTypes.number.isRequired,
    }),
  ),
};

export default FeaturedAlbums;
