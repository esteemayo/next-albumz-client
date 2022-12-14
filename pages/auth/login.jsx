/* global gapi */
import Link from 'next/link';
// import { gapi } from 'gapi-script';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import Meta from '@/components/Meta';
import Spinner from '@/components/Spinner';
import { parseCookie } from '@/utils/index';
import FormInput from '@/components/FormInput';
import styles from '@/styles/Login.module.scss';
import { loginUser, reset } from '@/features/auth/authSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser({ userData, toast }));
  };

  const handleSuccess = (response) => {
    console.log(response);
  };

  const handleFailure = (error) => {
    return toast.error(error);
  };

  useEffect(() => {
    isError && toast.error(message);
    user && isSuccess && router.push('/users/dashboard');
    dispatch(reset());
  }, [user, isSuccess, isError, message, router, dispatch]);

//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         clientId: clientId,
//         scope: '',
//       });
//     };
//     gapi.load('client:auth2', initClient);
//  });

  if (isLoading) {
    return (
      <section className={styles.container}>
        <Spinner />
      </section>
    );
  }

  return (
    <>
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
                  <button type='submit' className={styles.form__btn}>Log in</button>
                </div>
                {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </GoogleOAuthProvider> */}
                <GoogleLogin
                  clientId={clientId}
                  render={(renderProps) => (
                    <div className={styles.form__btnWrapper}>
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className={styles.form__btnGoogle}
                      >
                        <span className={styles.socialLoginIcon}>
                          <GoogleIcon className={styles.googleIcon} />
                        </span>
                       <span className={styles.socialLoginText}>Log in with google</span>
                      </button>
                    </div>
                  )}
                  onSuccess={handleSuccess}
                  onFailure={handleFailure}
                  cookiePolicy='single_host_origin'
                  isSignedIn={true}
                />
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/users/register' passHref>Register</Link> | {' '}
            <Link href='/auth/forgot' passHref>Lost your password?</Link>
          </div>
        </div>
      </section>
    </>
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
