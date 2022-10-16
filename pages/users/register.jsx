import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';

import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';
import styles from '@/styles/Login.module.scss';
import FormChipInput from '@/components/FormChipInput';
import { registerUser, reset } from '@/features/auth/authSlice';

const initialState = {
  name: '',
  username: '',
  email: '',
  location: '',
  favGenres: [],
  favArtists: [],
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message } = useSelector((state) => ({ ...state.auth }));

  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formInputs, setFormInputs] = useState(initialState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const {favGenres, favArtists, password, confirmPassword } = formInputs;

  const emptyFieldCheck = Object.values(formInputs).some((item) => item === '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const userData = {
      ...formInputs,
    }
    
    dispatch(registerUser({ userData, toast }));
  };

  useEffect(() => {
    isError && toast.error(message);
    user && isSuccess && router.push('/users/dashboard');
    dispatch(reset());
  }, [user, isSuccess, isError, message, router, dispatch]);

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
                <FormInput
                  name='name'
                  placeholder='Name'
                  onChange={handleChange}
                >
                  <PersonOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='username'
                  placeholder='Username'
                  onChange={handleChange}
                >
                  <FaceOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='email'
                  placeholder='Email Address'
                  onChange={handleChange}
                >
                  <EmailOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='location'
                  placeholder='Location'
                  onChange={handleChange}
                >
                  <LocationOnOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormChipInput
                  name='favGenres'
                  placeholder='Favorite Genres'
                  value={favGenres}
                  onAdd={(genre) => handleAddFavGenre(genre)}
                  onDelete={(genre) => handleDeleteFavGenre(genre)}
                >
                  <PianoOutlinedIcon className={styles.form__chipIcon} />
                </FormChipInput>
                <FormChipInput
                  name='favArtists'
                  placeholder='Favorite Artists'
                  value={favArtists}
                  onAdd={(artist) => handleAddFavArtist(artist)}
                  onDelete={(artist) => handleDeleteFavArtist(artist)}
                >
                  <PlaylistAddCheckCircleOutlinedIcon className={styles.form__chipIcon} />
                </FormChipInput>
                <FormInput
                  name='password'
                  type={showPassword ? 'text': 'password'}
                  placeholder='Password'
                  onChange={handleChange}
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
                <FormInput
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text': 'password'}
                  placeholder='Confirm Password'
                  onChange={handleChange}
                >
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
                </FormInput>
                <FormInput
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                >
                  <FileUploadOutlinedIcon className={styles.form__icon} />
                </FormInput>
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
