import PropTypes from 'prop-types';

import StarRating from '../StarRating';
import styles from '@/styles/ReviewForm.module.scss';

const ReviewForm = ({
  rating,
  review,
  disabled,
  onRating,
  onReview,
  onSubmit,
}) => {
  return (
    <section className={styles.review}>
      <div className={styles.review__wrapper}>
        <form onSubmit={onSubmit} className={styles.form}>
          <h3 className={styles.review__header}>Leave a review</h3>
          <div className={styles.form__group}>
            <textarea
              value={review}
              onChange={(e) => onReview(e.target.value)}
              className={styles.form__control} 
              placeholder='Did you listen to this album? Have something to say? Leave a review...'
            >
            </textarea>
          </div>
          <div className={styles.form__wrapper}>
            <div className={styles.left}>
              <StarRating
                name='size-large'
                value={rating}
                onChange={(e, newValue) => {
                  onRating(newValue);
                }}
              />
            </div>
            <div className={styles.right}>
              <button
                type='submit'
                disabled={disabled}
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

ReviewForm.propTypes = {
  rating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onRating: PropTypes.any.isRequired,
  onReview: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;
