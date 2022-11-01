import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

import styles from '@/styles/RelatedAlbumCard.module.scss';

const RelatedAlbumCard = ({ slug, image, title, artist, createdAt }) => {
  return (
    <div className={styles.related__card}>
      <div className={styles.left}>
        <Image
          src={image ?? '/img/banner.jpg'}
          width='70'
          height='70'
          objectFit='cover'
          alt={title}
        />
      </div>
      <div className={styles.right}>
        <h6 className={styles.title}>
          <Link href={`/albums/${slug}`} passHref>
            <a className={styles.link}>{title}</a>
          </Link>
        </h6>
        <p className={styles.artist}>{artist}</p>
        <span className={styles.year}>
          {new Date(createdAt).toLocaleString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

RelatedAlbumCard.propTypes = {
  slug: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default RelatedAlbumCard;
