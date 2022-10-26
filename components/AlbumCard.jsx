import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { excerpts } from '@/utils/index';
import LikeButton from '@/components/LikeButton';
import styles from '@/styles/AlbumCard.module.scss';

const AlbumCard = ({ album }) => {
  const [singleAlbum, setSingleAlbum] = useState(album);

  const { _id: id, tags, info, slug, image, likes, title, ratingsAverage, ratingsQuantity } = singleAlbum;

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
          <LikeButton likes={likes} albumId={id} setSingleAlbum={setSingleAlbum} />
          {/* <FavoriteBorderOutlinedIcon className={styles.like__btn} />
          <span>Liked by jdoe and 2 others</span> */}
        </div>
      </div>
      <div className={styles.card__details}>
        <span className={styles.card__tag}>
          {tags?.map((tag, index) => {
            return (
              <Link key={index} href={`/albums/tags/${tag}`} passHref>
                <a className={styles.tag__link}>#{tag}{', '}</a>
              </Link>
            );
          })}
        </span>
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
