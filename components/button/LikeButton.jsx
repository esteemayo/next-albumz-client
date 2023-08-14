import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import useFavorite from '@/hooks/useFavorite';
import HeartIcon from '@/components/HeartIcon';

import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes, actionId, onAction }) => {
  const router = useRouter();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { hasFavorited, toggleFavorite } = useFavorite({
    actionId,
    likes,
    user,
    onAction,
  });

  const handleLike = useCallback((e) => {
    e.stopPropagation();

    return !user ?
      router.push('/auth/login') :
      toggleFavorite();
  }, [user, toggleFavorite, router]);

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

LikeButton.propTypes = {
  type: PropTypes.string,
  likes: PropTypes.array.isRequired,
  actionId: PropTypes.string.isRequired,
  onAction: PropTypes.any.isRequired,
};

export default LikeButton;
