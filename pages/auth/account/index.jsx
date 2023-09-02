import { toast } from 'react-toastify';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useDispatch, useSelector } from 'react-redux';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Image from 'next/image';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import FormInput from '@/components/form/FormInput';
import FormChipInput from '@/components/form/FormChipInput';
import Sidebar from '@/components/account/Sidebar';
import AccountData from '@/components/account/AccountData';
import FormButton from '@/components/form/FormButton';

import { parseCookie } from '@/utils/index';
import { reset, updateUserData } from '@/features/auth/authSlice';
import { uploadImage } from '@/services/imageService';

import styles from '@/styles/Account.module.scss';

const Account = () => {
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isError,
    isLoading,
    message,
  } = useSelector((state) => ({ ...state.auth }));

  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState({
    name: currentUser?.name,
    username: currentUser?.username,
    email: currentUser?.email,
    location: currentUser?.location,
    favGenres: currentUser?.favGenres,
    favArtists: currentUser?.favArtists,
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

  const handleFile = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  const emptyFieldCheck = Object.values(formInputs).some((item) => item === '');

  const { 
    name,
    username,
    email,
    location,
    favGenres,
    favArtists,
   } = formInputs;

  const handleSubmit = useCallback(async (e) => {
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
      }

      dispatch(updateUserData({ userData, toast }));
    } catch (err) {
      console.log(err);
    }
  }, [file, formInputs, emptyFieldCheck, dispatch]);

  const userAvatar = useMemo(() => {
    return file ?
      URL.createObjectURL(file) :
      currentUser?.avatar ? currentUser?.avatar :
      !currentUser?.avatar ? '/img/user-default.jpg' : '';
  }, [file, currentUser]);

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
          <Sidebar
            avatar={userAvatar}
            currentUser={currentUser}
            styles={styles}
          />
          <AccountData
            name={name}
            email={email}
            username={username}
            location={location}
            favGenres={favGenres}
            favArtists={favArtists}
            currentUser={currentUser}
            disabled={isLoading}
            onChange={handleChange}
            onUpload={handleFile}
            onSubmit={handleSubmit}
            onAddArtist={handleAddFavArtist}
            onAddGenre={handleAddDeleteArtist}
            onDeleteArtist={handleAddFavGenre}
            onDeleteGenre={handleDeleteFavGenre}
          />
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
