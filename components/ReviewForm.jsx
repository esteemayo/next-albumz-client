import { useState } from 'react';
import Rating from '@mui/material/Rating';

import styles from '@/styles/ReviewForm.module.scss';
import { createReview } from '@/services/albumService';

const ReviewForm = ({ albumId, setReviews }) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newReview = {
        rating,
        review,
      };

      const { data } = await createReview(albumId, { ...newReview });
      setReviews((prev) => [...prev, data.review]);
    } catch (err) {
      console.log(err);
    }
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
              <button
                type='submit'
                disabled={!rating || !review}
                className={styles.form__btn}
              >
                Submit review
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
