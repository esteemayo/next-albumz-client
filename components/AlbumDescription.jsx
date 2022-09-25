import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';

import StarRating from '@/components/StarRating';
import styles from '@/styles/AlbumDescription.module.scss';

const AlbumDescription = () => {
  return (
    <section className={styles.description}>
      <div className={styles.left}>
        <div className={styles.album__wrapper}>
          <h2 className={styles.album__heading}>About album</h2>
          <div className={styles.album__details}>
            <span>
              <MusicNoteOutlinedIcon className={styles.icon} />
            </span>
            <span>Artist</span>
            <span>Wizkid</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <TitleOutlinedIcon className={styles.icon} />
            </span>
            <span>Title</span>
            <span>Made in lagos</span>
            </div>
          <div className={styles.album__details}>
            <span>
              <CategoryOutlinedIcon className={styles.icon} />
            </span>
            <span>Genre</span>
            <span>Afro pop</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <DateRangeOutlinedIcon className={styles.icon} />
            </span>
            <span>Year of Release</span>
            <span>2020</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <AlbumOutlinedIcon className={styles.icon} />
            </span>
            <span>Record Label</span>
            <span>Star boy</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <FormatListNumberedOutlinedIcon className={styles.icon} />
            </span>
            <span>Number of Tracks</span>
            <span>18</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <StarOutlineOutlinedIcon className={styles.icon} />
            </span>
            <span>Ratings</span>
            <span>5 / 5</span>
          </div>
          <StarRating value={5} className={styles.rating} />
          <div className={styles.action}>
            <span className={styles.action__wrapper}>
              <div className={styles.view__container}>
                <VisibilityOutlinedIcon className={styles.action__icon} />
                <span className={styles.views}>700 views</span>
              </div>
            </span>
            <span className={styles.action__wrapper}>
            <Tooltip TransitionComponent={Zoom} title='Bookmark' arrow>
              <IconButton>
                <BookmarkAddOutlinedIcon
                  className={`${styles.action__icon} ${styles.bookmark__icon}`}
                />
              </IconButton>
            </Tooltip>
            </span>
            <span className={styles.action__wrapper}>
              <FavoriteBorderOutlinedIcon
                className={`${styles.action__icon} ${styles.like__icon}`}
              />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightWrapper}>
          <h2 className={styles.album__heading}>About made in lagos album</h2>
          <p className={styles.album__info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor leo eu enim ultricies, id maximus quam elementum. Morbi sit amet malesuada quam. 
            Nam molestie mauris eget tristique bibendum. Morbi euismod mi non dolor efficitur congue. Proin eu risus nibh. Fusce nulla nisi, feugiat nec arcu blandit, pretium condimentum ex. Donec rutrum est sed vehicula sagittis. 
            Nulla eu enim non arcu tempus tempor nec id eros. In fermentum, dolor quis euismod dignissim, ipsum risus dignissim elit, sit amet luctus mauris massa ac erat. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlbumDescription;
