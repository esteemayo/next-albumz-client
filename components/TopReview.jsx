import Image from 'next/image';

import StarRating from './StarRating';
import styles from '@/styles/TopReview.module.scss';

const TopReview = ({ user, rating, review }) => {
  return (
    <div className={styles.reviews}>
      <div className={styles.reviewer__img}>
        <Image
          src={user.avatar ?? '/img/user-default.jpg'}
          width={80}
          height={80}
          objectFit='cover'
          alt={user.name}
        />
      </div>
      <div className={styles.reviewer__review}>
        <p>{review}</p>
      </div>
      <div className={styles.reviewer__rating}>
        <StarRating value={rating} className={styles.ratingIcon} />
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
      <div className={styles.reviewer__name}>{user.name}</div>
    </div>
  );
};

export default TopReview;
