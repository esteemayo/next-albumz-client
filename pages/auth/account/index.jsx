import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';

import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import styles from '@/styles/Account.module.scss';
import FormChipInput from '@/components/FormChipInput';

const initialState = {
  name: '',
  username: '',
  email: '',
  location: '',
  favGenres: [],
  favArtists: [],
};

const Account = () => {
  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState(initialState);

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

  const {favGenres, favArtists } = formInputs;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
                  src={file ? URL.createObjectURL(file) : '/img/admin.JPG'}
                  width={80}
                  height={80}
                  objectFit='cover'
                  alt=''
                />
              </div>
              <h2 className={styles.userName}>Emmanuel adebayo</h2>
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
            </ul>
          </div>
          <div className={styles.right}>
            <h2 className={styles.accountHeader}>Profile</h2>
            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  name='name'
                  placeholder='Name'
                  onChange={handleChange}
                >
                  <PersonOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='email'
                  placeholder='Email Address'
                  onChange={handleChange}
                >
                  <EmailOutlinedIcon className={styles.form__icon} />
                </FormInput>
                <FormInput
                  name='username'
                  placeholder='Username'
                >
                  <FaceOutlinedIcon className={styles.form__icon} />
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
                />
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

export default Account;
