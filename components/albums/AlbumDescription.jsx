import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlbumHead from './AlbumHead';
import AlbumDetails from './AlbumDetails';

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

  const handleSetAsBookmark = useCallback(() => {
    user && dispatch(bookmarkReducer.createNewBookmark({ album, toast }));
  }, [user, album, dispatch]);

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
      <AlbumHead
        album={album}
        views={views}
        albumId={albumId}
        bookmark={bookmark}
        onAdd={handleSetAsBookmark}
        onRemove={handleUnSetAsBookmark}
        onAction={setSingleAlbum}
      />
      <AlbumDetails
        info={album?.info}
        title={album.title}
        show={readMore}
        onClick={setReadMore}
      />
    </section>
  );
};

export default AlbumDescription;
