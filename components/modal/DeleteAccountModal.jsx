import PropTypes from 'prop-types';

import DialogBox from './DialogBox';
import DeleteAccount from '../account/DeleteAccount';

const DeleteAccountModal = ({ isOpen, onClose }) => {
  return (
    <DialogBox isOpen={isOpen}>
      <DeleteAccount onClose={onClose} />
    </DialogBox>
  );
};

DeleteAccountModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default DeleteAccountModal;
