import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/router';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useMemo } from 'react';
import Visibility from '@mui/icons-material/Visibility';

import ClientOnly from '@/components/ClientOnly';
import Meta from '@/components/Meta';
import FormInput from '@/components/form/FormInput';
import Spinner from '@/components/Spinner';

import { parseCookie } from '@/utils/index';
import { googleSignIn, loginUser, reset } from '@/features/auth/authSlice';
import { auth, provider } from '../../firebase';

import styles from '@/styles/Login.module.scss';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser({ userData, toast }));
  }, [email, password,  dispatch]);

  const loginWithGoogle = useCallback((e) => {
    e.stopPropagation();

    signInWithPopup(auth, provider)
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          username: result.user.displayName.split(' ')[0],
          avatar: result.user.photoURL,
        };

        dispatch(googleSignIn({ userData, toast }));
      }).catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    user && isSuccess && router.push('/users/dashboard');
    dispatch(reset());
  }, [user, isSuccess, router, dispatch]);

  useEffect(() => {
    isError && toast.error(message);
  }, [isError, message]);

  if (isLoading) {
    return (
      <section className={styles.container}>
        <Spinner />
      </section>
    );
  }

  return (
    <ClientOnly>
      <Meta title='Log in to Your Account - Albumz Music Entertainment' />
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>Login</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper}>
                <div className={styles.form__headline}>Log in to Your Account</div>
                <FormInput
                  type='email'
                  name='email'
                  autoFocus
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <EmailOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                >
                  {showPassword ? (
                    <VisibilityOff
                      onClick={handleShowPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                  ) : (
                    <Visibility
                      onClick={handleShowPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                  )}
                </FormInput>
                <div className={styles.form__btnWrapper}>
                  <button
                    type='submit'
                    className={styles.form__btn}
                    disabled={isLoading}
                  >
                      Log in
                    </button>
                </div>
              </div>
            </form>
            <div className={styles.form__googleBtnWrapper}>
              <button 
                onClick={loginWithGoogle}
                className={styles.form__btnGoogle}
                disabled={isLoading}
              >
                <span className={styles.socialLoginIcon}>
                  <GoogleIcon className={styles.googleIcon} />
                </span>
                <span className={styles.socialLoginText}>Log in with google</span>
              </button>
            </div>
          </div>
          <div className={styles.links}>
            <Link href='/users/register' passHref>Register</Link> | {' '}
            <Link href='/auth/forgot' passHref>Lost your password?</Link>
          </div>
        </div>
      </section>
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

export default Login;
