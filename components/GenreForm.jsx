import { useState } from 'react';

import FormInput from './FormInput';
import FormButton from './FormButton';
import styles from '@/styles/Form.module.scss';
import { createGenre } from '@/services/genreService';

const GenreForm = ({ onClose }) => {
  const [name, setName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createGenre({ name });
      onClose(false);
    } catch(err) {
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
