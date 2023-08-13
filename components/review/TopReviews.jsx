import TopReview from './TopReview';
import styles from '@/styles/TopReviews.module.scss';

const TopReviews = ({ reviews }) => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Testimonials</h3>
        <div className={styles.box}>
          {reviews?.map((item) => {
            return <TopReview key={item._id} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export const getStaticProps = async () => {};

export default TopReviews;
