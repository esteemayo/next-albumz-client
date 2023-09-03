import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import Sidebar from '@/components/account/Sidebar';
import AccountPassword from '@/components/account/AccountPassword';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import { parseCookie } from '@/utils/index';
import { useDialogBox } from '@/hooks/useDialogBox';

import { reset, updateUserPassword } from '@/features/auth/authSlice';

import styles from '@/styles/UpdatePassword.module.scss';

const initialState = {
  password: '',
  confirmPassword: '',
  currentPassword: '',
};

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDialogBox();
  const {
    user: currentUser,
    isError,
    isLoading,
    message,
  } = useSelector((state) => ({ ...state.auth }));

  const [values, setValues] = useState(initialState);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleChange = useCallback(({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((value) => !value);
  }, []);
  
  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((value) => !value);
  }, []);

  const toggleCurrentPassword = useCallback(() => {
    setShowCurrentPassword((value) => !value);
  }, []);

  const handleClear = useCallback(() => {
    setValues(initialState);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const userData = {
      ...values,
    };

    dispatch(updateUserPassword({ userData, toast }));
    handleClear();
  }, [handleClear, dispatch]);

  const userAvatar = useMemo(() => {
    return currentUser?.avatar ?? '/img/user-default.jpg';
  }, [currentUser]);

  const disabledBtn = useMemo(() => {
    const { password, passwordConfirm, passwordCurrent } = values;
    const disabled = (
        password === '' ||
        passwordConfirm === '' ||
        passwordCurrent === '' ||
        isLoading
      );
    return !!disabled;
  }, [isLoading, values]);

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
            styles={styles}
          />
          <AccountPassword
            values={values}
            currentUser={currentUser}
            isPassword={showPassword}
            isConfirm={showConfirmPassword}
            isCurrent={showCurrentPassword}
            disabled={disabledBtn}
            loading={isLoading}
            onOpen={onOpen}
            onTogglePassword={togglePassword}
            onToggleConfirmPassword={toggleConfirmPassword}
            onToggleCurrentPassword={toggleCurrentPassword}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
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
