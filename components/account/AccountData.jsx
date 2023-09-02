import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import PianoOutlinedIcon from '@mui/icons-material/PianoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PropTypes from 'prop-types';

import FormInput from '@/components/form/FormInput';
import FormChipInput from '@/components/form/FormChipInput';
import FormButton from '@/components/form/FormButton';

import styles from '@/styles/Account.module.scss';

const AccountData = ({
  values,
  currentUser,
  disabled,
  onChange,
  onUpload,
  onSubmit,
  onAddArtist,
  onAddGenre,
  onDeleteArtist,
  onDeleteGenre,
}) => {
  const {
    name,
    username,
    email,
    location,
    favGenres,
    favArtists,
   } = values;
  return (
    <div className={styles.right}>
      <h2 className={styles.accountHeader}>Profile</h2>
      <div className={styles.formWrapper}>
        <form onSubmit={onSubmit} className={styles.form}>
          <FormInput
            name='name'
            placeholder='Name'
            value={name || ''}
            onChange={onChange}
          >
            <PersonOutlinedIcon className={styles.form__icon} />
          </FormInput>
          {!currentUser?.fromGoogle && (
            <FormInput
              name='email'
              placeholder='Email Address'
              value={email || ''}
              onChange={onChange}
            >
              <EmailOutlinedIcon className={styles.form__icon} />
            </FormInput>
          )}
          <FormInput
            name='username'
            placeholder='Username'
            value={username}
            onChange={onChange}
          >
            <FaceOutlinedIcon className={styles.form__icon} />
          </FormInput>
          <FormInput
            name='location'
            placeholder='Location'
            value={location}
            onChange={onChange}
          >
            <LocationOnOutlinedIcon className={styles.form__icon} />
          </FormInput>
          <FormChipInput
            name='favGenres'
            placeholder='Favorite Genres'
            value={favGenres}
            onAdd={(genre) => onAddGenre(genre)}
            onDelete={(genre) => onDeleteGenre(genre)}
          >
            <PianoOutlinedIcon className={styles.form__chipIcon} />
          </FormChipInput>
          <FormChipInput
            name='favArtists'
            placeholder='Favorite Artists'
            value={favArtists}
            onAdd={(artist) => onAddArtist(artist)}
            onDelete={(artist) => onDeleteArtist(artist)}
          >
            <PlaylistAddCheckCircleOutlinedIcon className={styles.form__chipIcon} />
          </FormChipInput>
          <FormInput
            type='file'
            onChange={onUpload}
          >
            <FileUploadOutlinedIcon className={styles.form__icon} />
          </FormInput>
          <FormButton
            text='Save'
            disabled={disabled}
          />
        </form>
      </div>
    </div>
  );
};

AccountData.propTypes = {
  values: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddArtist: PropTypes.func.isRequired,
  onAddGenre: PropTypes.func.isRequired,
  onDeleteArtist: PropTypes.func.isRequired,
  onDeleteGenre: PropTypes.func.isRequired,
};

export default AccountData;
