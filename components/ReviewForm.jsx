import { useState } from 'react';
import Rating from '@mui/material/Rating';

import styles from '@/styles/ReviewForm.module.scss';

const ReviewForm = () => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ review, rating });
  };

  return (
    <section className={styles.review}>
      <div className={styles.review__wrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.review__header}>Leave a review</h3>
          <div className={styles.form__group}>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              className={styles.form__control} 
              placeholder='Did you listen to this album? Have something to say? Leave a review...'
            >
            </textarea>
          </div>
          <div className={styles.form__wrapper}>
            <div className={styles.left}>
              <Rating
                size='large'
                name='size-large'
                value={rating}
                precision={0.5}
                onChange={(e, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div className={styles.right}>
              <button type='submit' className={styles.form__btn}>Submit review</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
