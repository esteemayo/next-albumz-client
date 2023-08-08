import { useSelector } from 'react-redux';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useEffect, useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Popup from './Popup';
import { likeAlbum } from '@/services/albumService';

import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes, albumId, setSingleAlbum }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (user && likes.find((like) => like === user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  const likeButton = user ? (
    liked ? (
      likes.length > 2 ? (
        <Popup title={`You and ${likes.length - 1} others`}>
          <FavoriteOutlinedIcon
            className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
          />
        </Popup>
      ) : (
        <Popup title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`}>
          <FavoriteOutlinedIcon
            className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
          />
        </Popup>
      )
    ) : (
      <Popup title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`}>
        <FavoriteBorderOutlinedIcon
          className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
        />
      </Popup>
    )
  ) : (
    <Popup title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`}>
      <FavoriteBorderOutlinedIcon
        className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
      />
    </Popup>
  );

  const handleLike = async () => {
    try {
      const { data } = await likeAlbum(albumId);
      setSingleAlbum(data.album);
    } catch (err) {
      console.log(err);
    }
  };

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
