import PropTypes from 'prop-types';

import Modal from './Modal';
import AlbumForm from '../form/AlbumForm';

const AlbumModal = ({ genres, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AlbumForm
        genres={genres}
        onClose={onClose}
      />
    </Modal>
  );
};

AlbumModal.propTypes = {
  genres: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlbumModal;
