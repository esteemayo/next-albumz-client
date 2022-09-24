import ReviewCard from './ReviewCard';
import styles from '@/styles/Reviews.module.scss';

const Reviews = () => {
  return (
    <section className={styles.reviews}>
      <h4 className={styles.header}>Reviews</h4>
      <ReviewCard />
      <ReviewCard />
    </section>
  );
};

export default Reviews;
