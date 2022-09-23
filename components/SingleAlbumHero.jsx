import Image from 'next/image';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import styles from '@/styles/SingleAlbumHero.module.scss';

const SingleAlbumHero = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__hero}>
        <div className={styles.header__heroOverlay}>&nbsp;</div>
        <Image
          src='/img/hero.jpeg'
          width='1600'
          height='693'
          objectFit='cover'
          layout='fill'
          alt='' 
          className={styles.__heroImg}
        />
      </div>
      <div className={styles.headingBox}>
        <h1 className={styles.headingPrimary}>
          <span>Made in lagos</span>
        </h1>
        <div className={styles.headingBox__group}>
          <div className={styles.headingBox__detail}>
            <ArtTrackIcon className={styles.headingBox__icon} />
            <div className={styles.headingBox__text}>tracks</div>
          </div>
          <div className={styles.headingBox__detail}>
            <CalendarTodayOutlinedIcon className={styles.headingBox__icon} />
            <div className={styles.headingBox__text}>year</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SingleAlbumHero;
