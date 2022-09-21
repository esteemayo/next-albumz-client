import Link from 'next/link';

import Meta from '@/components/Meta';
import styles from '@/styles/Login.module.scss';

const ForgotPassword = () => {
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
                <div className={styles.form__group}>
                  <input type='email' placeholder='Username or Email' className={styles.form__input} />
                </div>
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
