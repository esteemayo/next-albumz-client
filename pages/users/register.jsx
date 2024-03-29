import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';
import Spinner from '@/components/Spinner';
import FormChipInput from '@/components/form/FormChipInput';
import FormInput from '@/components/form/FormInput';

import { uploadImage } from '@/services/imageService';
import { registerUser, reset } from '@/features/auth/authSlice';

import styles from '@/styles/Login.module.scss';

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
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  const handleChange = useCallback(({ target: input }) => {
    const { name, value } = input;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddFavArtist = useCallback((favArtist) => {
    setFormInputs((prev) => ({
      ...prev,
      favArtists: [...prev.favArtists, favArtist],
    }));
  }, []);

  const handleDeleteFavArtist = useCallback((favArtist) => {
    setFormInputs((prev) => ({
      ...prev,
      favArtists: prev.favArtists.filter((artist) => artist !== favArtist),
    }));
  }, []);
  
  const handleAddFavGenre = useCallback((favGenre) => {
    setFormInputs((prev) => ({
      ...prev,
      favGenres: [...prev.favGenres, favGenre],
    }));
  }, []);

  const handleDeleteFavGenre = useCallback((favGenre) => {
    setFormInputs((prev) => ({
      ...prev,
      favGenres: prev.favGenres.filter((genre) => genre !== favGenre),
    }));
  }, []);

  const { favGenres, favArtists, password, confirmPassword } = formInputs;

  const emptyFieldCheck = Object.values(formInputs).some((item) => item === '');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (!favGenres.length) {
      return toast.error('Please enter your favorite genres');
    }

    if (!favArtists.length) {
      return toast.error('Please enter your favorite artistes');
    }

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const userData = {
      ...formInputs,
    };

    if (file) {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', 'albumz');

      try {
        const { data } = await uploadImage(form);
        const { url } = data;
        userData.avatar = url;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      dispatch(registerUser({ userData, toast }));
    } catch (err) {
      console.log(err);
    }
  }, 
    [
      file,
      password,
      confirmPassword,
      favGenres,
      favArtists,
      emptyFieldCheck,
      formInputs,
      dispatch,
    ]
  );

  useEffect(() => {
    isError && toast.error(message);
    user && isSuccess && router.push('/users/dashboard');
    dispatch(reset());
  }, [user, isSuccess, isError, message, router, dispatch]);

  if (isLoading) {
    return (
      <section className={`${styles.container} ${styles.registerContainer}`}>
        <Spinner />
      </section>
    );
  }

  return (
    <ClientOnly>
      <Meta title='Create an Account - Albumz Music Entertainment' />
      <section className={`${styles.container} ${styles.registerContainer}`}>
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
                  <button 
                    type='submit' 
                    className={styles.form__btn} 
                    disabled={isLoading}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.links}>
            <Link href='/auth/login' passHref>Have an account? Login</Link>
          </div>
        </div>
      </section>
    </ClientOnly>
  );
};

export default Register;
