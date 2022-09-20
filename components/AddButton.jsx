import styles from '@/styles/AddButton.module.scss';

const AddButton = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.btn__new}>New album</button>
    </div>
  );
};

export default AddButton;
