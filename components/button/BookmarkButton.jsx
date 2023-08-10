import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PropTypes from 'prop-types';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

import Popup from '@/components/Popup';
import styles from '@/styles/AlbumDescription.module.scss';

const BookmarkButton = ({ bookmark, onAdd, onRemove }) => {
  return (
    <>
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
    </>
  );
};

Bookmark.porpTypes = {
  bookmark: PropTypes.any,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default BookmarkButton;
