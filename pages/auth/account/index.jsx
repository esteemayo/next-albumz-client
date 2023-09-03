import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import FormChipInput from '@/components/form/FormChipInput';
import Sidebar from '@/components/account/Sidebar';
import AccountData from '@/components/account/AccountData';
import FormButton from '@/components/form/FormButton';
import AccountHeading from '@/components/account/AccountHeading';

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
        <AccountHeading
          styles={styles}
          title='Account settings'
        />
        <div className={styles.account__container}>
          <Sidebar
            avatar={userAvatar}
            currentUser={currentUser}
            styles={styles}
          />
          <AccountData
            values={formInputs}
            currentUser={currentUser}
            disabled={isLoading}
            onChange={handleChange}
            onUpload={handleFile}
            onSubmit={handleSubmit}
            onAddArtist={handleAddFavArtist}
            onAddGenre={handleAddFavGenre}
            onDeleteArtist={handleDeleteFavArtist}
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
