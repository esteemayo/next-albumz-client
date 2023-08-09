import styles from '@/styles/FormTextArea.module.scss';

const FormTextArea = ({ name, ...rest }) => {
  return (
    <div className={styles.form__group}>
      <textarea
        {...rest}
        name={name}
        className={styles.form__textarea}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
