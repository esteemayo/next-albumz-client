import Image from 'next/image';
import Rating from '@mui/material/Rating';

import styles from '@/styles/ReviewCard.module.scss';

const ReviewCard = () => {
  return (
    <div className={styles.review}>
      <div className={styles.review__card}>
        <div className={styles.left}>
          <div className={styles.reviewer}>
            <h5 className={styles.reviewer__name}>Aegen magazines</h5>
            <Rating
              name='read-only'
              size='large'
              precision={0.5}
              value={3.5}
              readOnly
              className={styles.reviewer__rating}
            />
          </div>
          <p className={styles.reviewer__review}>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing 
            industries for previewing layouts and visual mockups. credit (www.brighttv.co.th)
          </p>
          <div className={styles.line}>&nbsp;</div>
          <div className={styles.date}>
            <span>8:35 PM - Jan 4, 2022</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image__wrapper}>
            <Image
              src='/img/user-1.jpg'
              width={80}
              height={80}
              objectFit='cover'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
