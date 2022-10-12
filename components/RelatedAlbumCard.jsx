import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/RelatedAlbumCard.module.scss';

const RelatedAlbumCard = ({ image, title, artist, createdAt }) => {
  return (
    <div className={styles.related__card}>
      <div className={styles.left}>
        <Image
          src='/img/banner.jpg'
          width='70'
          height='70'
          objectFit='cover'
          alt={title}
        />
      </div>
      <div className={styles.right}>
        <h6 className={styles.title}>
          <Link href={`albums/slug`} passHref>
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

export default RelatedAlbumCard;
