import TopReview from './TopReview';
import styles from '@/styles/TopReviews.module.scss';

const TopReviews = ({ reviews }) => {
  return (
    <div className={styles.container}>
      <h3>Testimonials</h3>
      <div className={styles.wrapper}>
        {reviews?.map((item) => {
          return <TopReview key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {};

export default TopReviews;
