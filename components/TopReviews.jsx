import Image from 'next/image';

import StarRating from './StarRating';
import styles from '@/styles/TopReviews.module.scss';

const TopReviews = () => {
  return (
    <div className={styles.container}>
      <h3>Testimonials</h3>
      <div className={styles.wrapper}>
        <div className={styles.reviews}>
          <div className={styles.reviewer__img}>
            <Image
              src='/img/user-1.jpg'
              width={80}
              height={80}
              objectFit='cover'
              alt=''
            />
          </div>
          <div className={styles.reviewer__review}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              veniam fuga explicabo ex exercitationem autem.
            </p>
          </div>
          <div className={styles.reviewer__rating}>
            <StarRating value={4} className={styles.ratingIcon} />
            <span className={styles.ratingValue}>4.0</span>
          </div>
          <div className={styles.reviewer__name}>John doe</div>
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewer__img}>
            <Image
              src='/img/user-2.jpeg'
              width={80}
              height={80}
              objectFit='cover'
              alt=''
            />
          </div>
          <div className={styles.reviewer__review}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              veniam fuga explicabo ex exercitationem autem.
            </p>
          </div>
          <div className={styles.reviewer__rating}>
            <StarRating value={5} className={styles.ratingIcon} />
            <span className={styles.ratingValue}>5.0</span>
          </div>
          <div className={styles.reviewer__name}>Mary doe</div>
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewer__img}>
            <Image
              src='/img/user-3.jpg'
              width={80}
              height={80}
              objectFit='cover'
              alt=''
            />
          </div>
          <div className={styles.reviewer__review}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              veniam fuga explicabo ex exercitationem autem.
            </p>
          </div>
          <div className={styles.reviewer__rating}>
            <StarRating value={3} className={styles.ratingIcon} />
            <span className={styles.ratingValue}>3.0</span>
          </div>
          <div className={styles.reviewer__name}>Chris vega</div>
        </div>
      </div>
    </div>
  );
};

export default TopReviews;
