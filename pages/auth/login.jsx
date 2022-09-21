import Link from 'next/link';

import Meta from '@/components/Meta';
import styles from '@/styles/Login.module.scss';

const Login = () => {
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
                <div className={styles.form__group}>
                  <input 
                    type='email' 
                    placeholder='Username or Email' 
                    className={styles.form__input} 
                  />
                </div>
                <div className={styles.form__group}>
                  <input 
                    type='password' 
                    placeholder='Password'
                    className={styles.form__input}
                   />
                </div>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Log in</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/users/register' pasHref>Register</Link> | {' '}
            <Link href='/auth/forgot' pasHref>Lost your password</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
