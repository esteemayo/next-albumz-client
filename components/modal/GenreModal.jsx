import Modal from './Modal';
import GenreForm from '../form/GenreForm';

const GenreModal = ({ isOpen, onClose, onAction }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <GenreForm
        type='genre'
        onClose={onClose}
        onAction={onAction}
      />
    </Modal>
  );
};

export default GenreModal;
