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
