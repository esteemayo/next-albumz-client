import ReviewCard from './ReviewCard';
import styles from '@/styles/Reviews.module.scss';

const Reviews = ({ reviews }) => {
  const sorted = reviews.sort((a, b) => a.createdAt - b.createdAt)
  console.log(sorted)
  return (
    <>
      {reviews.length > 0 && (
        <section className={styles.reviews}>
          <h4 className={styles.header}>{reviews.length > 1 ? 'Reviews' : 'Review'}</h4>
          {reviews
            .sort((a,b) => b.createdAt - a.createdAt)
            .map((item) => {
              return <ReviewCard key={item._id} {...item} />;
          })}
        </section>
      )}
    </>
  );
};

export default Reviews;
