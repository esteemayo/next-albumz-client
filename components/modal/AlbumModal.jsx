import Modal from './Modal';
import AlbumForm from '../form/AlbumForm';

const AlbumModal = ({ genres, onClose }) => {
  return (
    <Modal>
      <AlbumForm
        genres={genres}
        onClose={onClose}
      />
    </Modal>
  );
};

export default AlbumModal;
