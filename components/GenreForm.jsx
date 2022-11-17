import { useState } from 'react';
import { toast } from 'react-toastify';

import FormInput from './FormInput';
import FormButton from './FormButton';
import styles from '@/styles/Form.module.scss';
import { createGenre } from '@/services/genreService';

const GenreForm = ({ onClose, setGenreList }) => {
  const [name, setName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      return toast.error('Please provide a name');
    }

    await handleCreateGenre();
  };

  const handleCreateGenre = async () => {
    try {
      const { data } = await createGenre({ name });
      setGenreList((prev) => [data.genre, ...prev]);
      onClose(false);
    } catch (err) {
      console.log(err);
    }
  };

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

export default GenreForm;
