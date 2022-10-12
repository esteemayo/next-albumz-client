import ReviewCard from './ReviewCard';
import styles from '@/styles/Reviews.module.scss';

const Reviews = ({ album }) => {
  return (
    <section className={styles.reviews}>
      <h4 className={styles.header}>Reviews</h4>
      {album.reviews.map((item) => {
        return <ReviewCard key={item._id} {...item} />;
      })}
    </section>
  );
};

export default Reviews;
