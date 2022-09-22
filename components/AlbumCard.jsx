import Link from 'next/link';
import Image from 'next/image';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import styles from '@/styles/AlbumCard.module.scss';

const AlbumCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__picture}>
          <div className={styles.card__pictureOverlay}>&nbsp;</div>
          <Image 
            src='/img/banner.jpg'
            width={345}
            height={230}
            objectFit='cover'
            alt='album'
          />
        </div>
        <h3 className={styles.heading__tertiary}>
          <span>Made in lagos</span>
        </h3>
        <div className={styles.icon__wrapper}>
          <FavoriteBorderOutlinedIcon className={styles.like__btn} />
          <span>Liked by jdoe and 2 others</span>
        </div>
      </div>
      <div className={styles.card__details}>
        <span className={styles.card__tag}>#latest</span>
        <p className={styles.card__text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          perferendis molestiae non nemo doloribus.
        </p>
      </div>
      <div className={styles.card__footer}>
        <p className={styles.card__ratings}>
          <span className={styles.card__footerValue}>4.8</span> {' | '}
          <span className={styles.card__footerText}>rating (6)</span>
        </p>
        <Link href={`/albums/slug`}>
          <a className={styles.card__footerBtn}>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default AlbumCard;
