import Link from 'next/link';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { excerpts } from '@/utils/index';
import LikeButton from '@/components/button/LikeButton';

import styles from '@/styles/AlbumCard.module.scss';

const AlbumCard = ({ album }) => {
  const [singleAlbum, setSingleAlbum] = useState(album);
  const {
    _id: id,
    tags,
    info,
    slug,
    image,
    likes,
    title,
    ratingsAverage,
    ratingsQuantity,
   } = singleAlbum;

   const url = useMemo(() => {
    return `/albums/${encodeURIComponent(slug)}`;
   }, [slug]);

  return (
    <article className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__picture}>
          <div className={styles.card__pictureOverlay}>&nbsp;</div>
          <Image 
            src={image ?? '/img/default-album-1.webp'}
            width={345}
            height={230}
            objectFit='cover'
            alt=''
          />
        </div>
        <h3 className={styles.heading__tertiary}>
          <span>{title}</span>
        </h3>
        <div className={styles.icon__wrapper}>
          <LikeButton
            likes={likes}
            actionId={id}
            onAction={setSingleAlbum}
          />
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
        <Link href={url}>
          <a className={styles.card__footerBtn}>Details</a>
        </Link>
      </div>
    </article>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    info: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    ratingsQuantity: PropTypes.number.isRequired,
  }),
};

export default AlbumCard;
