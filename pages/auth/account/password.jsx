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

import DeleteAccount from '@/components/account/DeleteAccount';
import FormInput from '@/components/form/FormInput';
import DeactivateAccount from '@/components/account/DeactivateAccount';
import DialogBox from '@/components/modal/DialogBox';
import FormButton from '@/components/form/FormButton';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import { parseCookie } from '@/utils/index';
import { reset, updateUserPassword } from '@/features/auth/authSlice';

import styles from '@/styles/UpdatePassword.module.scss';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { user, isError, isLoading, message } = useSelector((state) => ({ ...state.auth }));

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  
  const [showModal, setShowModal] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleOpenModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const disableButton = useMemo(() => {
    const disabled = 
      isLoading ||
      password === '' ||
      confirmPassword=== '' ||
      currentPassword=== '';
    
    return !!disabled;
  }, 
    [
      isLoading,
      password,
      confirmPassword,
      currentPassword,
    ]
  );

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

  const handleClear = useCallback(() => {
    setPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  }, []);

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
          <div className={styles.left}>
            <div className={styles.userContainer}>
              <div className={styles.imageContainer}>
                <Image
                  src={user?.avatar ? user?.avatar : '/img/user-default.jpg'}
                  width={80}
                  height={80}
                  objectFit='cover'
                  alt={user?.username}
                />
              </div>
              <h2 className={styles.userName}>{user?.name}</h2>
            </div>
            <ul className={styles.list}>
              <li className={styles.list__item}>
                <HomeOutlinedIcon className={styles.itemIcon} />
                <Link href='/auth/account' passHref>
                  <a className={styles.itemLink}>Account</a>
                </Link>
              </li>
              <li className={`${styles.list__item} ${styles.active}`}>
                <KeyOutlinedIcon className={styles.itemIcon} />
                <Link href='/auth/account/password' passHref>
                  <a className={styles.itemLink}>Password</a>
                </Link>
              </li>
              <li className={styles.list__item}>
                <DashboardOutlinedIcon className={styles.itemIcon} />
                <Link href='/users/dashboard' passHref>
                  <a className={styles.itemLink}>Dashboard</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            {!user?.fromGoogle && (
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
                      disabled={disableButton}
                    />
                  </form>
                </div>
              </>
            )}
            <DeactivateAccount
              disabled={isLoading}
              onOpen={handleOpenModal}
            />
          </div>
        </div>
      </section>
      {!showModal && (
        <DialogBox>
          <DeleteAccount onClose={handleCloseModal} />
        </DialogBox>
      )}
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
