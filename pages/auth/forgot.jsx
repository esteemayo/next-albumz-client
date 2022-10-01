import Link from 'next/link';
import { useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';
import styles from '@/styles/Login.module.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Meta title='Forgot Password - Albumz Music Entertainment' />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>Forgot Password</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper}>
                <div className={styles.form__headline}>Reset Your Password</div>
                <FormInput
                  type='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <EmailOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Reset password</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/auth/login' pasHref>Return to Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
