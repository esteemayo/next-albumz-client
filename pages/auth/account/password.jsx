import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Image from 'next/image';
import Visibility from '@mui/icons-material/Visibility';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

import FormInput from '@/components/form/FormInput';
import DeactivateAccount from '@/components/account/DeactivateAccount';
import FormButton from '@/components/form/FormButton';
import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import Sidebar from '@/components/account/Sidebar';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import { parseCookie } from '@/utils/index';
import { useDialogBox } from '@/hooks/useDialogBox';

import { reset, updateUserPassword } from '@/features/auth/authSlice';

import styles from '@/styles/UpdatePassword.module.scss';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDialogBox();
  const {
    user: currentUser,
    isError,
    isLoading,
    message,
  } = useSelector((state) => ({ ...state.auth }));

  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  
  const [showModal, setShowModal] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleClear = useCallback(() => {
    setPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const userData = {
      password,
      confirmPassword,
      currentPassword,
    };

    dispatch(updateUserPassword({ userData, toast }));
    handleClear();
  }, 
    [
      password,
      confirmPassword,
      currentPassword,
      handleClear,
      dispatch,
    ]
  );

  const userAvatar = useMemo(() => {
    return currentUser?.avatar ?? '/img/user-default.jpg';
  }, [currentUser]);

  useEffect(() => {
    isError && toast.error(message);
    dispatch(reset());
  }, [isError, message, dispatch]);

  return (
    <ClientOnly>
      <Meta title='Account - Albumz Music Entertainment' />
      <section className={styles.account}>
        <h1 className={styles.account__heading}>Account settings</h1>
        <div className={styles.account__container}>
          <Sidebar
            avatar={userAvatar}
            currentUser={currentUser}
          />
          <div className={styles.right}>
            {!currentUser?.fromGoogle && (
              <>
                <h2 className={styles.accountHeader}>Password</h2>
                <div className={styles.formWrapper}>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <FormInput
                      value={currentPassword}
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder='Current Password'
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    >
                      {showCurrentPassword ? (
                        <VisibilityOff
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className={`${styles.form__icon} ${styles.form__iconPassword}`}
                          />
                      ) : (
                        <Visibility
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className={`${styles.form__icon} ${styles.form__iconPassword}`}
                        />
                      )}
                    </FormInput>
                    <FormInput
                      value={password}
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      {showPassword ? (
                        <VisibilityOff
                          onClick={() => setShowPassword(!showPassword)}
                          className={`${styles.form__icon} ${styles.form__iconPassword}`}
                          />
                      ) : (
                        <Visibility
                          onClick={() => setShowPassword(!showPassword)}
                          className={`${styles.form__icon} ${styles.form__iconPassword}`}
                        />
                      )}
                    </FormInput>
                    <FormInput
                      value={confirmPassword}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`${styles.form__icon} ${styles.form__iconPassword}`}
                          />
                      ) : (
                        <Visibility
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`${styles.form__icon} ${styles.form__iconPassword}`}
                        />
                      )}
                    </FormInput>
                    <FormButton
                      text='Update password'
                      disabled={isLoading}
                    />
                  </form>
                </div>
              </>
            )}
            <DeactivateAccount
              onOpen={onOpen}
              disabled={isLoading}
            />
          </div>
        </div>
      </section>
      <DeleteAccountModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </ClientOnly>
  );
};

export const getServerSideProps = ({ req }) => {
  const { token } = parseCookie(req);

  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UpdatePassword;
