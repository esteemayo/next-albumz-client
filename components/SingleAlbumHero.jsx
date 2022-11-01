import Image from 'next/image';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import styles from '@/styles/SingleAlbumHero.module.scss';

const SingleAlbumHero = ({ album }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__hero}>
        <div className={styles.header__heroOverlay}>&nbsp;</div>
        <Image
          src={album.image ? album.image : '/img/default-album-1.webp'}
          width='1600'
          height='693'
          objectFit='cover'
          layout='fill'
          alt={album.title}
          className={styles.__heroImg}
        />
      </div>
      <div className={styles.headingBox}>
        <h1 className={styles.headingPrimary}>
          <span>{album.title}</span>
        </h1>
        <div className={styles.headingBox__group}>
          <div className={styles.headingBox__detail}>
            <ArtTrackIcon className={styles.headingBox__icon} />
            <div className={styles.headingBox__text}>{album.tracks}</div>
          </div>
          <div className={styles.headingBox__detail}>
            <CalendarTodayOutlinedIcon className={styles.headingBox__icon} />
            <div className={styles.headingBox__text}>{ album.year}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SingleAlbumHero;
