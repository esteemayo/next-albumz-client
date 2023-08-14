import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';

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

  const toggleLike = useCallback(() => {
    return !user ? null : handleLike();
  }, [user, handleLike]);

  const likeClasses = useMemo(() => {
    return hasFavorited ? 'btnLiked' : 'btnUnlike';
  }, [hasFavorited]);

  return (
    <div className={styles.icon__wrapper}>
      <button onClick={toggleLike} className={likeClasses}>
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
