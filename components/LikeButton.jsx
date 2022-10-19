import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { likeAlbum } from '@/services/albumService';
import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type }) => {
  return (
    <div className={styles.icon__wrapper}>
      <FavoriteBorderOutlinedIcon 
        className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
      />
    </div>
  );
};

export default LikeButton;
