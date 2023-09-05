import PropTypes from 'prop-types';
import { useCallback } from 'react';

import LikeButton from '@/components/button/LikeButton';
import FormatNumber from '@/components/FormatNumber';
import BookmarkButton from '@/components/button/BookmarkButton';

import StarRating from '../StarRating';
import AlbumInfo from './AlbumInfo';
import AlbumViews from './AlbumViews';

import { albumInfoItems } from '../../data';
import styles from '@/styles/AlbumDescription.module.scss';

const AlbumHead = ({
  album,
  views,
  albumId,
  bookmark,
  onAdd,
  onRemove,
  onAction,
}) => {
  const albumData = useCallback((item) => {
    return item === 'ratingsAverage' ?
      `${album[item]} / 5` :
        album[item];
  }, [album]);

  return (
    <div className={styles.left}>
      <div className={styles.album__wrapper}>
        <h2 className={styles.album__heading}>About album</h2>
        {albumInfoItems.map((item) => {
          const { id, icon, label } = item;
          return (
            <AlbumInfo
              key={id}
              icon={icon}
              label={label}
              data={albumData(id)}
            />
          );
        })}
        <StarRating
          className={styles.rating}
          value={album.ratingsAverage}
        />
        <div className={styles.action}>
          <span className={styles.action__wrapper}>
            <AlbumViews views={views} />
          </span>
          <span className={styles.action__wrapper}>
            <BookmarkButton
              bookmark={bookmark}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          </span>
          <span className={styles.action__wrapper}>
            <LikeButton
              type='single'
              likes={album.likes}
              actionId={albumId}
              onAction={onAction}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

AlbumHead.propTypes = {
  album: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tracks: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
  }),
  views: PropTypes.array.isRequired,
  albumId: PropTypes.string.isRequired,
  bookmark: PropTypes.any,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAction: PropTypes.any.isRequired,
};

export default AlbumHead;
