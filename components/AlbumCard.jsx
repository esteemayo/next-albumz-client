import Link from 'next/link';
import Image from 'next/image';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { excerpts } from '@/utils/index';
import styles from '@/styles/AlbumCard.module.scss';

const AlbumCard = ({ tags, info, slug, image, title, ratingsAverage, ratingsQuantity }) => {
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
          <span>{title}</span>
        </h3>
        <div className={styles.icon__wrapper}>
          <FavoriteBorderOutlinedIcon className={styles.like__btn} />
          <span>Liked by jdoe and 2 others</span>
        </div>
      </div>
      <div className={styles.card__details}>
        <span className={styles.card__tag}>{tags.map((tag) => `#${tag}, `)}</span>
        <p className={styles.card__text}>{info && excerpts(info, 100)}</p>
      </div>
      <div className={styles.card__footer}>
        <p className={styles.card__ratings}>
          <span className={styles.card__footerValue}>{ratingsAverage}</span> {' | '}
          <span className={styles.card__footerText}>rating ({ratingsQuantity})</span>
        </p>
        <Link href={`/albums/${slug}`}>
          <a className={styles.card__footerBtn}>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default AlbumCard;
