import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import FormButton from './FormButton';

import { createGenre } from '@/services/genreService';

import styles from '@/styles/Form.module.scss';

const GenreForm = ({ onClose, setGenreList }) => {
  const [name, setName] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!name) {
      return toast.error('Please provide a name');
    }

    await handleCreateGenre();
  }, [ name, handleCreateGenre]);

  const handleCreateGenre = useCallback(async () => {
    try {
      const { data } = await createGenre({ name });
      setGenreList((prev) => [data.genre, ...prev]);
      onClose();
    } catch (err) {
      console.log(err);
    }
  }, [name, onClose]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Add Genre</h1>
        </header>
        <div className={styles.form__container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form__wrapper} style={{ height: '25rem' }}>
              <div className={styles.form__headline}>Create New Genre</div>
              <FormInput
                autoFocus
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />
              <FormButton text='Submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

GenreForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  setGenreList: PropTypes.array.isRequired,
};

export default GenreForm;
