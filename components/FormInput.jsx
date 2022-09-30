import styles from '@/styles/FormInput.module.scss';

const FormInput = ({ name, type='text', children,  ...rest }) => {
  return (
    <div className={styles.form__group}>
      <input
        {...rest}
        name={name}
        type={type}
        className={styles.form__input}
      />
      {children}
    </div>
  );
};

export default FormInput;
