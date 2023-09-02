import PropTypes from 'prop-types';

import DialogBox from './DialogBox';
import DeleteAlbumGenre from '../DeleteAlbumGenre';

const DeleteGenreModal = ({
  actionId,
  title,
  onClose,
  onAction,
}) => {
  return (
    <DialogBox>
      <DeleteAlbumGenre
        actionId={actionId}
        title={title}
        onClose={onClose}
        onAction={onAction}
      />
    </DialogBox>
  );
};

DeleteGenreModal.propTypes = {
  actionId: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default DeleteGenreModal;
