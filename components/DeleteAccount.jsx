import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { deleteMe } from '@/services/userService';
import { logoutUser } from '@/features/auth/authSlice';

import styles from '@/styles/DeleteAccount.module.scss';

const DeleteAccount = ({ onClose }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleDeleteUserAccount = async () => {
    await deactivateUserAccount();
    await push('/');
    onClose();
  };

  const deactivateUserAccount = async () => {
    try {
      await deleteMe();
      dispatch(logoutUser());
      toast.success('Account closed successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.warning}>
          <h4>You are about to delete your account</h4>
          <p>All your albums will be permanently removed and you won&apos;t be
            able to see them again, including the ones you have shared with
            your friends.
          </p>
        </div>
        <div className={styles.btnContainer}>
          <button
            onClick={onClose}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUserAccount}
            className={styles.deleteBtn}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
