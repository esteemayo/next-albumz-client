import PropTypes from 'prop-types';

import Popup from '../Popup';
import StarRating from '../StarRating';
import AlbumInfo from './AlbumInfo';

import { albumInfoItems } from '../../data';
import LikeButton from '@/components/button/LikeButton';

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
              data={album[id]}
            />
          );
        })}
        <StarRating
          className={styles.rating}
          value={album.ratingsAverage}
        />
        <div className={styles.action}>
          <span className={styles.action__wrapper}>
            <div className={styles.view__container}>
              <VisibilityOutlinedIcon className={styles.action__icon} />
              <span className={styles.views}>{views?.length} {views?.length > 1 ? 'views' : 'view'}</span>
            </div>
          </span>
          <span className={styles.action__wrapper}>
            {!bookmark ? (
              <Popup title='Bookmark'>
                <BookmarkAddOutlinedIcon
                  onClick={onAdd}
                  className={`${styles.action__icon} ${styles.bookmark__icon}`}
                />
              </Popup>
            ) : (
              <Popup title='Unbookmark'>
                <BookmarkAddedOutlinedIcon
                  onClick={onRemove}
                  className={`${styles.action__icon} ${styles.bookmark__icon}`}
                />
              </Popup>
            )}
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
