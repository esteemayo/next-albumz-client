import Zoom from '@mui/material/Zoom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { likeAlbum } from '@/services/albumService';
import styles from '@/styles/LikeButton.module.scss';

const LikeButton = ({ type, likes, albumId }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (user && likes.find((like) => user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      likes.length > 2 (
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
      )
    ) : (
      <FavoriteBorderOutlinedIcon
        className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
      />
    )
  ) : (
    <FavoriteBorderOutlinedIcon
      className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
    />
  );

  const handleLike = async () => {
    try {
      await likeAlbum(albumId);
    } catch (err) {
      console.log(err);
    }
  };

  // const Likes = () => {
  //   if (likes.length > 0) {
  //     return likes.find(like => like === user?._id) ? (
  //       likes.length > 2 ? (
  //         <Tooltip TransitionComponent={Zoom} title={`You and ${likes.length - 1} other peoples like`} arrow>
  //           <IconButton>
  //             <FavoriteOutlinedIcon
  //               onClick={!user ? null : handleLike}
  //               className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
  //             />
  //           </IconButton>
  //         </Tooltip>
  //       ) : (
  //         <Tooltip TransitionComponent={Zoom} title={`${likes.length} Like${likes.length > 1 ? 's' : ''}`} arrow>
  //           <IconButton>
  //             <FavoriteBorderOutlinedIcon
  //               onClick={!user ? null : handleLike}
  //               className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
  //             />
  //           </IconButton>
  //         </Tooltip>
  //       )
  //     ) : (
  //       <FavoriteBorderOutlinedIcon
  //         onClick={!user ? null : handleLike}
  //         className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
  //       />
  //     );
  //   }

  //   return (
  //     <FavoriteBorderOutlinedIcon
  //       onClick={!user ? null : handleLike}
  //       className={type === 'single' ? `${styles.like__icon} ${styles.action__icon}` : `${styles.like__icon}`}
  //     />
  //   );
  // };

  return (
    <div className={styles.icon__wrapper}>
      <button onClick={!user ? null : handleLike}>
        {likeButton}
      </button>
    </div>
  );
};

export default LikeButton;
