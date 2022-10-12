import Image from 'next/image';

import StarRating from '@/components/StarRating';
import styles from '@/styles/ReviewCard.module.scss';

const ReviewCard = ({ rating, review, user, createdAt }) => {
  return (
    <div className={styles.review}>
      <div className={styles.review__card}>
        <div className={styles.left}>
          <div className={styles.reviewer}>
            <h5 className={styles.reviewer__name}>{user.name}</h5>
            <StarRating value={rating} className={styles.reviewer__rating} />
          </div>
          <p className={styles.reviewer__review}>{review}</p>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.date}>
            <span>8:35 PM - {new Date(createdAt).toDateString()}</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image__wrapper}>
            <Image
              src={user.avatar ? user.avatar : '/img/user-default.jpg'}
              width={80}
              height={80}
              objectFit='cover'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
