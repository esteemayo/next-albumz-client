import { useCallback, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import ReviewCard from './ReviewCard';
import styles from '@/styles/Reviews.module.scss';

const Reviews = ({ reviews, onSort }) => {
  const [reviewList, setReviewList] = useState(reviews);

  const updateReviewOrder = useCallback((reviews) => {
    setReviewList(reviews);
  }, []);

  return (
    <>
      {reviews.length > 0 && (
        <section className={styles.reviews}>
          <h4 className={styles.header}>
            {reviews.length > 1 ? 'Reviews' : 'Review'}
          </h4>
          <ReactSortable list={reviewList} setList={updateReviewOrder}>
            {reviewList.map((item) => {
              return <ReviewCard key={item._id} {...item} />;
            })}
          </ReactSortable>
        </section>
      )}
    </>
  );
};

export default Reviews;
