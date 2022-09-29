import { useState } from 'react';

import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import styles from '@/styles/UpdateGenre.module.scss';

const UpdateGenre = () => {
  const [name, setName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Genre</h1>
        </header>
        <div className={styles.form__container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form__wrapper} style={{ height: '25rem' }}>
              <div className={styles.form__headline}>Update Genre</div>
              <FormInput
                placeholder='Name' 
                onChange={(e) => setName(e.target.value)}
              />
              <FormButton text='Update' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateGenre;
