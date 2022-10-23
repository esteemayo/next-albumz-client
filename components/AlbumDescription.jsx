import { useEffect } from 'react';
import Zoom from '@mui/material/Zoom';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';

import LikeButton from '@/components/LikeButton';
import StarRating from '@/components/StarRating';
import styles from '@/styles/AlbumDescription.module.scss';
import * as bookmarkReducer from '@/features/bookmark/bookmarkSlice';
import { createViews, getViews, reset } from '@/features/views/viewSlice';

const AlbumDescription = ({ album, setSingleAlbum }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { views } = useSelector((state) => ({ ...state.views }));
  const { bookmark } = useSelector((state) => ({ ...state.bookmark }));

  const albumId = album?._id;

  const handleSetAsBookmark = (album) => {
    user && dispatch(bookmarkReducer.createNewBookmark({ album, toast }));
  };

  const handleUnSetAsBookmark = () => {
    const bookmarkId = bookmark?._id;
    user && dispatch(bookmarkReducer.removeBookmark({ bookmarkId, toast }));
  };

  useEffect(() => {
    albumId && dispatch(bookmarkReducer.fetchBookmark(albumId));
    return () => dispatch(bookmarkReducer.reset());
  }, [albumId, dispatch]);

  useEffect(() => {
    dispatch(getViews(albumId));
    user && dispatch(createViews({ album: albumId }));
    return () => dispatch(reset());
  }, [user, albumId, dispatch]);

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
            <span>{album.artist}</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <TitleOutlinedIcon className={styles.icon} />
            </span>
            <span>Title</span>
            <span>{album.title}</span>
            </div>
          <div className={styles.album__details}>
            <span>
              <CategoryOutlinedIcon className={styles.icon} />
            </span>
            <span>Genre</span>
            <span>{album.genre}</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <DateRangeOutlinedIcon className={styles.icon} />
            </span>
            <span>Year of Release</span>
            <span>{album.year}</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <AlbumOutlinedIcon className={styles.icon} />
            </span>
            <span>Record Label</span>
            <span>{album.label}</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <FormatListNumberedOutlinedIcon className={styles.icon} />
            </span>
            <span>Number of Tracks</span>
            <span>{album.tracks}</span>
          </div>
          <div className={styles.album__details}>
            <span>
              <StarOutlineOutlinedIcon className={styles.icon} />
            </span>
            <span>Ratings</span>
            <span>{album.ratingsAverage} / 5</span>
          </div>
          <StarRating value={album.ratingsAverage} className={styles.rating} />
          <div className={styles.action}>
            <span className={styles.action__wrapper}>
              <div className={styles.view__container}>
                <VisibilityOutlinedIcon className={styles.action__icon} />
                <span className={styles.views}>{views?.length} {views?.length > 1 ? 'views': 'view'}</span>
              </div>
            </span>
            <span className={styles.action__wrapper}>
              {!bookmark ? (
                <Tooltip TransitionComponent={Zoom} title='Bookmark' arrow>
                  <IconButton>
                    <BookmarkAddOutlinedIcon
                      onClick={() => handleSetAsBookmark(album?._id)}
                      className={`${styles.action__icon} ${styles.bookmark__icon}`}
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip TransitionComponent={Zoom} title='Unbookmark' arrow>
                  <IconButton>
                    <BookmarkAddedOutlinedIcon
                      onClick={handleUnSetAsBookmark}
                      className={`${styles.action__icon} ${styles.bookmark__icon}`}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </span>
            <span className={styles.action__wrapper}>
              <LikeButton
                type='single'
                likes={album.likes}
                albumId={albumId}
              />
              {/* <FavoriteBorderOutlinedIcon
                className={`${styles.action__icon} ${styles.like__icon}`}
              /> */}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightWrapper}>
          <h2 className={styles.album__heading}>About {album.title} album</h2>
          <p className={styles.album__info}>{album.info}</p>
        </div>
      </div>
    </section>
  );
};

export default AlbumDescription;
