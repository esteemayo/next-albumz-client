import styles from '@/styles/Form.module.scss';

const GenreForm = () => {
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
            <div className={styles.form__wrapper}>
              <div className={styles.form__headline}>Create New Genre</div>
              <div className={styles.form__group}>
                <input 
                  type='text' 
                  placeholder='Name' 
                  className={styles.form__input} 
                />
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

export default GenreForm;
