import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { excerpts } from '@/utils/index';

import styles from '@/styles/TagCard.module.scss';

const TagCard = ({ album: { info, slug, image, title } }) => {
  const router = useRouter();

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    router.push(`/albums/${slug}`);
  }, [slug, router]);

  return (
    <article className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.card__image}>
            <div className={styles.overlay}>&nbsp;</div>
            <Image
              src={image ?? '/img/default-album-1.webp'}
              width={200}
              height={130}
              objectFit='cover'
              alt=''
            />
          </div>
          <h3 className={styles.card__heading}>
            <span>{title}</span>
          </h3>
        </div>
        <div className={styles.right}>
          <p className={styles.card__info}>{info && excerpts(info, 250)}</p>
          <div className={styles.btnWrapper}>
            <button
              className={styles.btn}
              onClick={handleClick}
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

TagCard.propTypes = {
  album: PropTypes.shape({
    info: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default TagCard;
