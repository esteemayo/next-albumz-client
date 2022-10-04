import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/TagCard.module.scss';

const TagCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/albums/slug`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.card__image}>
            <div className={styles.overlay}>&nbsp;</div>
            <Image
              src='/img/banner.jpg'
              width={200}
              height={130}
              objectFit='cover'
              alt=''
            />
          </div>
          <h3 className={styles.card__heading}>
            <span>Made in lagos</span>
          </h3>
        </div>
        <div className={styles.right}>
          <p className={styles.card__info}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita 
            nisi molestias porro, itaque harum quas provident suscipit error doloribus 
            neque nulla. Est quia laudantium quo velit, atque placeat voluptate!
          </p>
          <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={handleClick}>Read more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagCard;
