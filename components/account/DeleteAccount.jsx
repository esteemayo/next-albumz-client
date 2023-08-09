import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { deleteMe } from '@/services/userService';
import { logoutUser } from '@/features/auth/authSlice';

import styles from '@/styles/DeleteAccount.module.scss';

const DeleteAccount = ({ onClose }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleDeleteUserAccount = useCallback(async (e) => {
    e.stopPropagation();

    await deactivateUserAccount();
    await push('/');
    onClose();
  }, [onClose, deactivateUserAccount, push]);

  const deactivateUserAccount = useCallback(async () => {
    try {
      await deleteMe();
      dispatch(logoutUser());
      toast.success('Account closed successfully');
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

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
