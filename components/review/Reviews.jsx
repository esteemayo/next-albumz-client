import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import PropTypes from 'prop-types';

import ReviewCard from './ReviewCard';
import styles from '@/styles/Reviews.module.scss';

const Reviews = ({ reviews, onSort }) => {
  return (
    <>
      {!!reviews.length > 0 && (
        <section className={styles.reviews}>
          <h4 className={styles.header}>
            {reviews.length > 1 ? 'Reviews' : 'Review'}
          </h4>
          <ReactSortable list={reviews} setList={onSort}>
            {reviews.map((item) => {
              return <ReviewCard key={item._id} {...item} />;
            })}
          </ReactSortable>
        </section>
      )}
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf({
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      album: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  }),
};

export default Reviews;
