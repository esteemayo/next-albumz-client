import Image from 'next/image';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import AlbumCard from '@/components/AlbumCard';
import styles from '@/styles/FeaturedAlbums.module.scss';

const FeaturedAlbums = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading__secondary}>Featured albums</h2>
      <div className={styles.wrapper}>
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </div>
    </div>
  );
};

export default FeaturedAlbums;
