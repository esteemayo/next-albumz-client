import Image from 'next/image';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import styles from '@/styles/FeaturedAlbums.module.scss';

const FeaturedAlbums = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading__secondary}>Featured albums</h2>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.card__header}>
            <div className={styles.card__image}>&nbsp;</div>
            {/* <Image
              src='https://source.unsplash.com/600x400/?computer'
              alt='card__image'
              className='card__image'
              width='345'
              height='230'
            /> */}
          </div>
          <div className={styles.card__body}>
            <span className={styles.tag}>#album, #new, #cover, #latest</span>
            <h4 className={styles.header}>
              <span>Made in lagos</span>
            </h4>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              perferendis molestiae non nemo doloribus.
            </p>
          </div>
          <div className={styles.card__footer}>
            <div className={styles.user}>
              <Image src='https://i.pravatar.cc/40?img=1' width={40} height={40} alt='user__image' className='user__image' />
              <div className={styles.text}>
                <h5 className={styles.user__name}>Jane Doe</h5>
                <small>2h ago</small>
              </div>
            </div>
            <div className={styles.icon__wrapper}>
              <FavoriteBorderOutlinedIcon />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__header}>
            <div className={styles.card__image}>&nbsp;</div>
            {/* <Image
              src='https://source.unsplash.com/600x400/?computer'
              alt='card__image'
              className='card__image'
              width='345'
              height='230'
            /> */}
          </div>
          <div className={styles.card__body}>
            <span className={styles.tag}>#album, #new, #cover, #latest</span>
            <h4 className={styles.header}>
              <span>Love damini</span>
            </h4>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              perferendis molestiae non nemo doloribus.
            </p>
          </div>
          <div className={styles.card__footer}>
            <div className={styles.user}>
              <Image src='https://i.pravatar.cc/40?img=1' width={40} height={40} alt='user__image' className='user__image' />
              <div className={styles.text}>
                <h5 className={styles.user__name}>Jane Doe</h5>
                <small>2h ago</small>
              </div>
            </div>
            <div className={styles.icon__wrapper}>
              <FavoriteBorderOutlinedIcon />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card__header}>
            <div className={styles.card__image}>&nbsp;</div>
            {/* <Image
              src='https://source.unsplash.com/600x400/?computer'
              alt='card__image'
              className='card__image'
              width='345'
              height='230'
            /> */}
          </div>
          <div className={styles.card__body}>
            <span className={styles.tag}>#album, #new, #cover, #latest</span>
            <h4 className={styles.header}>
              <span>A better time</span>
            </h4>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              perferendis molestiae non nemo doloribus.
            </p>
          </div>
          <div className={styles.card__footer}>
            <div className={styles.user}>
              <Image src='https://i.pravatar.cc/40?img=1' width={40} height={40} alt='user__image' className='user__image' />
              <div className={styles.text}>
                <h5 className={styles.user__name}>Jane Doe</h5>
                <small>2h ago</small>
              </div>
            </div>
            <div className={styles.icon__wrapper}>
              <FavoriteBorderOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedAlbums;
