import { useState } from 'react';

import FormInput from './FormInput';
import FormButton from './FormButton';
import styles from '@/styles/Form.module.scss';

const GenreForm = () => {
  const [name, setName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
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
