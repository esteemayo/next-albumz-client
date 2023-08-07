import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { toast } from 'react-toastify';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useDispatch, useSelector } from 'react-redux';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Image from 'next/image';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import { useCallback, useEffect, useState  } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';
import FormInput from '@/components/FormInput';
import FormChipInput from '@/components/FormChipInput';
import FormButton from '@/components/FormButton';

import { parseCookie } from '@/utils/index';
import { reset, updateUserData } from '@/features/auth/authSlice';
import { uploadImage } from '@/services/imageService';

import styles from '@/styles/Account.module.scss';

const Account = () => {
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => ({ ...state.auth }));

  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState({
    name: user?.name,
    username: user?.username,
    email: user?.email,
    location: user?.location,
    favGenres: user?.favGenres,
    favArtists: user?.favArtists,
  });

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

  const emptyFieldCheck = Object.values(formInputs).some((item) => item === '');

  const { name, username, email, location, favGenres, favArtists } = formInputs;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const userData = {
      ...formInputs,
    };

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'albumz');
    
    try {
      if (file) {
        const { data } = await uploadImage(form);
        const { url } = data;
        userData.avatar = url;

        dispatch(updateUserData({ userData, toast }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isError && toast.error(message);
    dispatch(reset());
  }, [isError, message, dispatch]);

  return (
    <ClientOnly>
      <Meta title='Account - Albumz Music Entertainment' />
      <section className={styles.account}>
        <h1 className={styles.account__heading}>Account settings</h1>
        <div className={styles.account__container}>
          <div className={styles.left}>
            <div className={styles.userContainer}>
              <div className={styles.imageContainer}>
                <Image
                  src={file ? URL.createObjectURL(file) : user?.avatar ? user?.avatar : !user?.avatar ? '/img/user-default.jpg' : ''}
                  width={80}
                  height={80}
                  objectFit='cover'
                  alt={user?.username}
                />
              </div>
              <h2 className={styles.userName}>{user?.name}</h2>
            </div>
            <ul className={styles.list}>
              <li className={`${styles.list__item} ${styles.active}`}>
                <HomeOutlinedIcon className={styles.itemIcon} />
                <Link href='/auth/account' passHref>
                  <a className={styles.itemLink}>Account</a>
                </Link>
              </li>
              <li className={styles.list__item}>
                <KeyOutlinedIcon className={styles.itemIcon} />
                <Link href='/auth/account/password' passHref>
                  <a className={styles.itemLink}>Password</a>
                </Link>
              </li>
              <li className={styles.list__item}>
                <DashboardOutlinedIcon className={styles.itemIcon} />
                <Link href='/users/dashboard' passHref>
                  <a className={styles.itemLink}>Dashboard</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <h2 className={styles.accountHeader}>Profile</h2>
            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  name='name'
                  placeholder='Name'
                  value={name || ''}
                  onChange={handleChange}
                >
                  <PersonOutlinedIcon className={styles.form__icon} />
                </FormInput>
                {!user?.fromGoogle && (
                  <FormInput
                  name='email'
                  placeholder='Email Address'
                  value={email || ''}
                  onChange={handleChange}
                  >
                    <EmailOutlinedIcon className={styles.form__icon} />
                  </FormInput>
                )}
                <FormInput
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={handleChange}
                >
                  <FaceOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='location'
                  placeholder='Location'
                  value={location}
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
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                >
                  <FileUploadOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormButton text='Save' />
              </form>
            </div>
          </div>
        </div>
      </section>
    </ClientOnly>
  );
};

export const getServerSideProps = ({ req }) => {
  const { token } = parseCookie(req);
  
  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Account;
