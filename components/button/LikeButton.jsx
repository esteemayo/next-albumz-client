import { useSelector } from 'react-redux';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useCallback, useMemo } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Popup from '../Popup';
import HeartButton from './HeartButton';
import useFavorite from '@/hooks/useFavorite';

import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes, actionId, onAction }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { hasFavorited, handleLike } = useFavorite({
    actionId,
    likes,
    user,
    onAction,
  });

  const likePopup = useMemo(() => {
    return `You and ${likes.length - 1} others`;
  }, [likes]);

  const popupTitle = useMemo(() => {
    return `${likes.length} Like${likes.length > 1 ? 's' : ''}`;
  }, [likes]);

  const likeClasses = useMemo(() => {
    return type === 'single' ?
      `${styles.like__icon} ${styles.action__icon}` :
      `${styles.like__icon}`;
  }, [type]);

  const likeButton = user ? (
    hasFavorited ? (
      likes.length > 2 ? (
        <Popup title={likePopup}>
          <FavoriteOutlinedIcon className={likeClasses} />
        </Popup>
      ) : (
        <Popup title={popupTitle}>
          <FavoriteOutlinedIcon className={likeClasses} />
        </Popup>
      )
    ) : (
      <Popup title={popupTitle}>
        <FavoriteBorderOutlinedIcon className={likeClasses} />
      </Popup>
    )
  ) : (
    <Popup title={popupTitle}>
      <FavoriteBorderOutlinedIcon className={likeClasses} />
    </Popup>
  );

  return (
    <div className={styles.icon__wrapper}>
      <button
        onClick={!user ? null : handleLike}
        className={hasFavorited ? 'btnLiked' : 'btnUnlike'}
      >
        <HeartButton
          user={user}
          type={type}
          likes={likes}
          liked={hasFavorited}
        />
      </button>
    </div>
  );
};

export default LikeButton;
