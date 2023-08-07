import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ClientOnly from '@/components/ClientOnly';
import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';

import { parseCookie } from '@/utils/index';
import { reset, resetPassword } from '@/features/auth/authSlice';

import styles from '@/styles/Login.module.scss';

const initialState = {
  password: '',
  confirmPassword: '',
  showPassword: '',
  showConfirmPassword: '',
};

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => ({ ...state.auth }));

  const [inputs, setInputs] = useState(initialState);

  const handleChange = useCallback(({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setInputs((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setInputs((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  }, []);

  const { password, confirmPassword, showPassword, showConfirmPassword } = inputs;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const { token } = router.query;
    const credentials = {
      password,
      confirmPassword,
    };

    dispatch(resetPassword({ token, credentials, toast }));
  }, [password, confirmPassword, router, dispatch]);

  useEffect(() => {
    isError && toast.error(message);
    isSuccess && router.push('/auth/login');
    dispatch(reset());
  }, [isError,isSuccess, message, router, dispatch]);

  return (
    <ClientOnly>
      <Meta title='Reset Password - Albumz Music Entertainment' />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>Reset Password</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper}>
                <div className={styles.form__headline}>Reset Your Password</div>
                <FormInput
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  onChange={handleChange}
                >
                  {showPassword ? (
                    <VisibilityOff
                      onClick={toggleShowPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                  ) : (
                    <Visibility
                      onClick={toggleShowPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                  )}
                </FormInput>
                <FormInput
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  onChange={handleChange}
                >
                  {showConfirmPassword ? (
                    <VisibilityOff
                      onClick={toggleShowConfirmPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                  ) : (
                    <Visibility
                      onClick={toggleShowConfirmPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                  )}
                </FormInput>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Reset password</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/auth/forgot' passHref>Return to Lost Password</Link>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export const getServerSideProps = ({ req }) => {
  const { token } = parseCookie(req);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ResetPassword;
