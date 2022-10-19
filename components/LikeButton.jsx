import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { likeAlbum } from '@/services/albumService';
import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(like => like === user._id) ? (
        <Tooltip TransitionComponent={Zoom} title={`You and ${likes.length - 1} other peoples like`} arrow>
          <IconButton>
            <FavoriteOutlinedIcon
              className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip TransitionComponent={Zoom} title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`} arrow>
          <IconButton>
            <FavoriteBorderOutlinedIcon
              className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
            />
          </IconButton>
        </Tooltip>
      );
    }

    return (
      <FavoriteBorderOutlinedIcon
        className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
      />
    );
  };

  return (
    <div className={styles.icon__wrapper}>
      {Likes()}
    </div>
  );
};

export default LikeButton;
