import Image from 'next/image';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import StarRating from '@/components/StarRating';
import { getUser } from '@/services/userService';

import styles from '@/styles/TopReview.module.scss';

const TopReview = ({ user: userId, rating, review }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUser(userId);
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId]);

  return (
    <article className={styles.reviews}>
      <div className={styles.reviewer__img}>
        <Image
          src={user.avatar ?? '/img/user-default.jpg'}
          width={80}
          height={80}
          objectFit='cover'
          alt=''
        />
      </div>
      <div className={styles.reviewer__review}>
        <p>{review}</p>
      </div>
      <div className={styles.reviewer__rating}>
        <StarRating value={rating} className={styles.ratingIcon} />
        <span className={styles.ratingValue}>{`(${rating.toFixed(1)})`}</span>
      </div>
      <div className={styles.reviewer__name}>{user.name}</div>
    </article>
  );
};

TopReview.propTypes = {
  user: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
};

export default TopReview;
