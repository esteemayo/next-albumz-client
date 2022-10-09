import Image from 'next/image';

import StarRating from './StarRating';
import styles from '@/styles/TopReviews.module.scss';

const TopReviews = ({ reviews }) => {
  return (
    <div className={styles.container}>
      <h3>Testimonials</h3>
      <div className={styles.wrapper}>
        {reviews?.map((item) => {
          const {_id: id, user, rating, review } = item;
          return (
            <div key={id} className={styles.reviews}>
              <div className={styles.reviewer__img}>
                <Image
                  src='/img/user-1.jpg'
                  width={80}
                  height={80}
                  objectFit='cover'
                  alt=''
                />
              </div>
              <div className={styles.reviewer__review}>
                <p>{review}</p>
              </div>
              <div className={styles.reviewer__rating}>
                <StarRating value={rating} className={styles.ratingIcon} />
                <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
              </div>
              <div className={styles.reviewer__name}>John doe</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {};

export default TopReviews;
