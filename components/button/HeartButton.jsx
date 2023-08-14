import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useCallback, useMemo, useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Popup from '../Popup';

import styles from '@/styles/LikeButton.module.scss';

const HeartButton = ({ user, type, likes, liked  }) => {
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
    liked ? (
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

  return likeButton;
};

export default HeartButton;
