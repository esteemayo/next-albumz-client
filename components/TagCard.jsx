import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { excerpts } from '@/utils/index';
import styles from '@/styles/TagCard.module.scss';

const TagCard = ({ album: { info, slug, image, title } }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/albums/${slug}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.card__image}>
            <div className={styles.overlay}>&nbsp;</div>
            <Image
              src={image ? image : '/img/default-album-1.webp'}
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
            <button className={styles.btn} onClick={handleClick}>Read more</button>
          </div>
        </div>
      </div>
    </div>
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
