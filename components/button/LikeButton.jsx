import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import useFavorite from '@/hooks/useFavorite';
import HeartIcon from '@/components/HeartIcon';

import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes, actionId, onAction }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { hasFavorited, toggleFavorite } = useFavorite({
    actionId,
    likes,
    user,
    onAction,
  });

  const handleLike = useCallback((e) => {
    e.stopPropagation();
    return !user ? null : toggleFavorite();
  }, [user, toggleFavorite]);

  const likeClasses = useMemo(() => {
    return !!hasFavorited ? 'btnLiked' : 'btnUnlike';
  }, [hasFavorited]);

  return (
    <div className={styles.icon__wrapper}>
      <button onClick={handleLike} className={likeClasses}>
        <HeartIcon
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
