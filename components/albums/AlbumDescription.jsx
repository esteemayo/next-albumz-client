import { toast } from 'react-toastify';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import { useDispatch, useSelector } from 'react-redux';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useCallback, useEffect, useState } from 'react';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';

import Popup from '../Popup';
import StarRating from '../StarRating';

import { excerpts } from '@/utils/index';
import LikeButton from '@/components/button/LikeButton';

import * as bookmarkReducer from '@/features/bookmark/bookmarkSlice';
import { createViews, getViews, reset } from '@/features/views/viewSlice';

import styles from '@/styles/AlbumDescription.module.scss';

const AlbumDescription = ({ album, setSingleAlbum }) => {
  const dispatch = useDispatch();
  const { views } = useSelector((state) => ({ ...state.views }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { bookmark } = useSelector((state) => ({ ...state.bookmark }));

  const [readMore, setReadMore] = useState(false);

  const albumId = album?._id;

  const handleSetAsBookmark = useCallback((album) => {
    user && dispatch(bookmarkReducer.createNewBookmark({ album, toast }));
  }, [user, dispatch]);

  const handleUnSetAsBookmark = useCallback(() => {
    const bookmarkId = bookmark?._id;
    user && dispatch(bookmarkReducer.removeBookmark({ bookmarkId, toast }));
  }, [user, bookmark?._id, dispatch]);

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
                <span className={styles.views}>{views?.length} {views?.length > 1 ? 'views' : 'view'}</span>
              </div>
            </span>
            <span className={styles.action__wrapper}>
              {!bookmark ? (
                <Popup title='Bookmark'>
                  <BookmarkAddOutlinedIcon
                    onClick={() => handleSetAsBookmark(album?._id)}
                    className={`${styles.action__icon} ${styles.bookmark__icon}`}
                  />
                </Popup>
              ) : (
                <Popup title='Unbookmark'>
                  <BookmarkAddedOutlinedIcon
                    onClick={handleUnSetAsBookmark}
                    className={`${styles.action__icon} ${styles.bookmark__icon}`}
                  />
                </Popup>
              )}
            </span>
            <span className={styles.action__wrapper}>
              <LikeButton
                type='single'
                likes={album.likes}
                albumId={albumId}
                setSingleAlbum={setSingleAlbum}
              />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightWrapper}>
          <h2 className={styles.album__heading}>About {album.title} album</h2>
          {!!readMore ? (
            <>
              {album.info.split('\n').map((item, index) => {
                return (
                  <p key={index} className={styles.album__info}>
                    {item}
                  </p>
                );
              })}
              <button
                onClick={() => setReadMore(false)}
                className={styles.btn__info}
            >
                Show less
              </button>
            </>
          ) : (
            <>
              {excerpts(album?.info, 350).split('\n').map((item, index) => {
              return (
                  <p key={index} className={styles.album__info}>
                    {item}
                  </p>
                );
              })}
              {album.info.length > 350 && (
                <button
                  onClick={() => setReadMore(true)}
                  className={styles.btn__info}
                >
                  Read more
              </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AlbumDescription;
