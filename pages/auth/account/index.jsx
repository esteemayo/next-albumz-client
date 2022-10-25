import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';

import Meta from '@/components/Meta';
import { parseCookie } from '@/utils/index';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import styles from '@/styles/Account.module.scss';
import { uploadImage } from '@/services/imageService';
import FormChipInput from '@/components/FormChipInput';
import { reset, updateUserData } from '@/features/auth/authSlice';

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

  const { name, username, email, location, favGenres, favArtists } = formInputs;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...formInputs,
    };

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'albumz/users');
    
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
    <>
      <Meta title='Account - Albumz Music Entertainment' />
      <section className={styles.account}>
        <h1 className={styles.account__heading}>Account settings</h1>
        <div className={styles.account__container}>
          <div className={styles.left}>
            <div className={styles.userContainer}>
              <div className={styles.imageContainer}>
                <Image
                  src={file ? URL.createObjectURL(file) : user?.avatar ? !user?.avatar : '/img/user-default.jpg'}
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
                <FormInput
                  name='email'
                  placeholder='Email Address'
                  value={email || ''}
                  onChange={handleChange}
                  >
                  <EmailOutlinedIcon className={styles.form__icon} />
                </FormInput>
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
    </>
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
