import styles from '@/styles/Form.module.scss';

const AlbumForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Add Album</h1>
        </header>
        <div className={styles.form__container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form__wrapper}>
              <div className={styles.form__headline}>Create New Album</div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Artist' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Album Title' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Genre' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Album Info' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Release Year' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Record Label' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Number of Tracks' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Tags' 
                  className={styles.form__input} 
                />
              </div>
              <div className={styles.form__group}>
                <input type='file' className={styles.form__input} />
              </div>
              <div className={styles.form__btnWrapper}>
                <button type='submit' className={styles.form__btn}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;
