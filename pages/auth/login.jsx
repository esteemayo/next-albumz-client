import Link from 'next/link';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';
import styles from '@/styles/Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Meta title='Log in to Your Account - Albumz Music Entertainment' />
      <div className={styles.container}>
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
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <EmailOutlinedIcon className={styles.form__icon} />
                  </FormInput>
                  <FormInput
                    type={showPassword ? 'text': 'password'}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    {showPassword ? (
                      <VisibilityOff
                      onClick={handleShowPassword}
                      className={styles.form__icon}
                      />
                    ) : (
                    <Visibility
                      onClick={handleShowPassword}
                      className={styles.form__icon}
                    />
                    )}
                  </FormInput>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Log in</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/users/register' passHref>Register</Link> | {' '}
            <Link href='/auth/forgot' passHref>Lost your password?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
