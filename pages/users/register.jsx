import Link from 'next/link';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Meta from '@/components/Meta';
import styles from '@/styles/Login.module.scss';
import FormChipInput from '@/components/FormChipInput';

const initialState = {
  name: '',
  username: '',
  email: '',
  location: '',
  favGenres: [],
  favArtists: [],
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
};

const Register = () => {
  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState(initialState);

  const handleShowPassword = () => {
    setFormInputs((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleShowConfirmPassword = () => {
    setFormInputs((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
  };

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFavArtist = (favArtist) => {
    setFormInputs((prev) => ({
      ...prev,
      favArtists: [...prev.favArtists, favArtist],
    }));
  };

  const handleDeleteFavArtist = (favArtist) => {
    setFormInputs((prev) => ({
      ...prev,
      favArtists: prev.favArtists.filter((artist) => artist !== favArtist),
    }));
  };
  
  const handleAddFavGenre = (favGenre) => {
    setFormInputs((prev) => ({
      ...prev,
      favGenres: [...prev.favGenres, favGenre],
    }));
  };

  const handleDeleteFavGenre = (favGenre) => {
    setFormInputs((prev) => ({
      ...prev,
      favGenres: prev.favGenres.filter((genre) => genre !== favGenre),
    }));
  };

  const {favGenres, favArtists, showPassword, showConfirmPassword } = formInputs;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formInputs });
  };

  return (
    <>
      <Meta title='Create an Account - Albumz Music Entertainment' />
      <div className={`${styles.container} ${styles.registerContainer}`}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>User Registration</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper}>
                <div className={styles.form__headline}>Create an Account</div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    onChange={handleChange}
                    className={styles.form__input}
                  />
                </div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={handleChange}
                    className={styles.form__input}
                  />
                </div>
                <div className={styles.form__group}>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    onChange={handleChange}
                    className={styles.form__input}
                  />
                </div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    name='location'
                    placeholder='Location'
                    onChange={handleChange}
                    className={styles.form__input}
                  />
                </div>
                <FormChipInput
                  name='favGenres'
                  placeholder='Favorite Genres'
                  value={favGenres}
                  onAdd={(genre) => handleAddFavGenre(genre)}
                  onDelete={(genre) => handleDeleteFavGenre(genre)}
                />
                <FormChipInput
                  name='favArtists'
                  placeholder='Favorite Artists'
                  value={favArtists}
                  onAdd={(artist) => handleAddFavArtist(artist)}
                  onDelete={(artist) => handleDeleteFavArtist(artist)}
                />
                <div className={styles.form__group}>
                  <input
                    name='password'
                    type={showPassword ? 'text': 'password'}
                    placeholder='Password'
                    onChange={handleChange}
                    className={styles.form__input}
                  />
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
                </div>
                <div className={styles.form__group}>
                  <input
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text': 'password'}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    className={styles.form__input}
                    />
                    {showConfirmPassword ? (
                     <VisibilityOff
                      onClick={handleShowConfirmPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                      />
                   ) : (
                    <Visibility
                      onClick={handleShowConfirmPassword}
                      className={`${styles.form__icon} ${styles.form__iconPassword}`}
                    />
                   )}
                </div>
                <div className={styles.form__group}>
                  <input
                  type='file'
                  className={styles.form__input}
                  onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Register</button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/auth/login' passHref>Have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
