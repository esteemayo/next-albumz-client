import Link from 'next/link';

import Meta from '@/components/Meta';
import styles from '@/styles/Login.module.scss';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Meta title='Create an Account - Albumz Music Entertainment' />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>User Registration</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper}>
                <div className={styles.form__headline}>Create an Account</div>
                <div className={styles.form__group}>
                  <input type='text' placeholder='Name' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='text' placeholder='Username' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='email' placeholder='Email Address' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='text' placeholder='Location' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='text' placeholder='Favorite Genres' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='text' placeholder='Favorite Artists' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='password' placeholder='Password' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='password' placeholder='Confirm Password' className={styles.form__input} />
                </div>
                <div className={styles.form__group}>
                  <input type='file' className={styles.form__input} />
                </div>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Register</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/auth/login' pasHref>Have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
