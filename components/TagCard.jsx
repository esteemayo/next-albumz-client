import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { excerpts } from '@/utils/index';
import styles from '@/styles/TagCard.module.scss';

const TagCard = ({ album }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/albums/${album.slug}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.card__image}>
            <div className={styles.overlay}>&nbsp;</div>
            <Image
              src='/img/banner.jpg'
              width={200}
              height={130}
              objectFit='cover'
              alt=''
            />
          </div>
          <h3 className={styles.card__heading}>
            <span>{album.title}</span>
          </h3>
        </div>
        <div className={styles.right}>
          <p className={styles.card__info}>{album.info && excerpts(album.info, 250)}</p>
          <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={handleClick}>Read more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagCard;
