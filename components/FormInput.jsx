import styles from '@/styles/FormInput.module.scss';

const FormInput = ({ name, type='text',  ...rest }) => {
  return (
    <div className={styles.form__group}>
      <input
        {...rest}
        name={name}
        type={type}
        className={styles.form__input}
      />
    </div>
  );
};

export default FormInput;
