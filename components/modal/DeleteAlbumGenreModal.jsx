import PropTypes from 'prop-types';

import DialogBox from './DialogBox';
import DeleteAlbumGenre from '../DeleteAlbumGenre';

const DeleteAlbumGenreModal = ({
  isOpen,
  actionId,
  title,
  onClose,
  onAction,
}) => {
  return (
    <DialogBox isOpen={isOpen}>
      <DeleteAlbumGenre
        actionId={actionId}
        title={title}
        onClose={onClose}
        onAction={onAction}
      />
    </DialogBox>
  );
};

DeleteAlbumGenreModal.propTypes = {
  isOPen: PropTypes.bool,
  actionId: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default DeleteAlbumGenreModal;
