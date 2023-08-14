import { useSelector } from 'react-redux';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Popup from '../Popup';
import useFavorite from '@/hooks/useFavorite';
import { likeAlbum } from '@/services/albumService';

import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes, actionId, onAction }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { hasFavorited, handleLike } = useFavorite({
    actionId,
    likes,
    user,
    onAction,
  });

  const likeClasses = useMemo(() => {
    return type === 'single' ?
      `${styles.like__icon} ${styles.action__icon}` :
      `${styles.like__icon}`;
  }, [type]);

  useEffect(() => {
    if (user && likes.find((like) => like === user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  console.log(hasFavorited)

  const likeButton = user ? (
    hasFavorited ? (
      likes.length > 2 ? (
        <Popup title={`You and ${likes.length - 1} others`}>
          <FavoriteOutlinedIcon className={likeClasses} />
        </Popup>
      ) : (
        <Popup title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`}>
          <FavoriteOutlinedIcon className={likeClasses} />
        </Popup>
      )
    ) : (
      <Popup title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`}>
        <FavoriteBorderOutlinedIcon className={likeClasses} />
      </Popup>
    )
  ) : (
    <Popup title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`}>
      <FavoriteBorderOutlinedIcon className={likeClasses} />
    </Popup>
  );

  // const handleLike = useCallback(async () => {
  //   try {
  //     const { data } = await likeAlbum(actionId);
  //     onAction(data.album);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [actionId]);

  return (
    <div className={styles.icon__wrapper}>
      <button
        onClick={!user ? null : handleLike}
        className={liked ? 'btnLiked' : 'btnUnlike'}
      >
        {likeButton}
      </button>
    </div>
  );
};

export default LikeButton;
