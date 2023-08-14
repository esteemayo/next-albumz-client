import { useMemo } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PropTypes from 'prop-types';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Popup from './Popup';

import styles from '@/styles/LikeButton.module.scss';

const HeartIcon = ({ user, type, likes, liked }) => {
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

HeartIcon.propTypes = {
  user: PropTypes.object.isRequired,
  type: PropTypes.string,
  likes: PropTypes.array.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default HeartIcon;
