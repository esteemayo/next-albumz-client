import ReviewCard from './ReviewCard';
import styles from '@/styles/Reviews.module.scss';

const Reviews = ({ reviews }) => {
  return (
    <>
      {reviews.length > 0 && (
        <section className={styles.reviews}>
          <h4 className={styles.header}>
            {reviews.length > 1 ? 'Reviews' : 'Review'}
          </h4>
          {reviews.map((item) => {
            return <ReviewCard key={item._id} {...item} />;
          })}
        </section>
      )}
    </>
  );
};

export default Reviews;
