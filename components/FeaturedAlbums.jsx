import Image from 'next/image';
import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import styles from '@/styles/FeaturedAlbums.module.scss';
const AlbumCard = lazy(() => import('@/components/AlbumCard'));

const FeaturedAlbums = ({ albums }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading__secondary}>Featured albums</h2>
      <div className={styles.wrapper}>
        <Suspense fallback={<h1>Loading</h1>}>
          {albums?.map((item) => {
            return <AlbumCard key={item._id} {...item} />;
          })}
        </Suspense>
      </div>
    </div>
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
