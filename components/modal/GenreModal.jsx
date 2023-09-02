import PropTypes from 'prop-types';

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

GenreModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.any.isRequired,
};

export default GenreModal;
