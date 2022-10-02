import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/RelatedAlbumCard.module.scss';

const RelatedAlbumCard = () => {
  return (
    <div className={styles.related__card}>
      <div className={styles.left}>
        <Image
          src='/img/banner.jpg'
          width='70'
          height='70'
          objectFit='cover'
          alt=''
        />
      </div>
      <div className={styles.right}>
        <h6 className={styles.title}>
          <Link href={`albums/slug`} passHref>
            <a className={styles.link}>A better time</a>
          </Link>
        </h6>
        <p className={styles.artist}>Davido</p>
        <span className={styles.year}>
          {new Date().toLocaleString('en-us', {
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
