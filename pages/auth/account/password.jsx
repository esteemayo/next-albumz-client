import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import Meta from '@/components/Meta';
import { parseCookie } from '@/utils/index';
import FormInput from '@/components/FormInput';
import DialogBox from '@/components/DialogBox';
import FormButton from '@/components/FormButton';
import DeleteAccount from '@/components/DeleteAccount';
import styles from '@/styles/UpdatePassword.module.scss';
import { reset, updateUserPassword } from '@/features/auth/authSlice';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => ({ ...state.auth }));

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  
  const [showModal, setShowModal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      password,
      confirmPassword,
      currentPassword,
    };

    dispatch(updateUserPassword({ userData, toast }));
    handleClear();
  };

  const handleClear = () => {
    setPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
  };

  useEffect(() => {
    isError && toast.error(message);
    dispatch(reset());
  }, [isError, message, dispatch]);

  return (
    <>
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
            <h2 className={styles.accountHeader}>Password</h2>
            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
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
                <FormButton text='Update password' />
              </form>
            </div>

            <div className={styles.delete}>
              <h3 className={styles.delete__header}>Close account</h3>
              <div className={styles.delete__container}>
                <p className={styles.delete__message}><strong>Warning:</strong> Closing your account is irreversible.</p>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.delete__btn}
                  >
                    Close this account...
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!showModal && (
        <DialogBox>
          <DeleteAccount onClose={setShowModal} />
        </DialogBox>
      )}
    </>
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
