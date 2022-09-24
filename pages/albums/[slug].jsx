import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Reviews from '@/components/Reviews';
import ReviewForm from '@/components/ReviewForm';
import SingleAlbumHero from '@/components/SingleAlbumHero';
import AlbumDescription from '@/components/AlbumDescription';
import styles from '@/styles/SingleAlbum.module.scss';

const SingleAlbum = () => {
  return (
    <section className={styles.container}>
      <SingleAlbumHero />
      {/* <section className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.icon__container}>
            <FavoriteBorderOutlinedIcon className={styles.like__btn} />
            <VisibilityOutlinedIcon />
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <BookmarkAddOutlinedIcon />
          </div>
        </div>
      </section> */}
      <AlbumDescription />
      <ReviewForm />
      <Reviews />
    </section>
  );
};

export default SingleAlbum;
