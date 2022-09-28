import styles from '@/styles/FormButton.module.scss';

const FormButton = ({ text, type, btn, ...rest }) => {
  return (
    <div className={styles.form__btnWrapper}>
      <button
        {...rest}
        type={type}
        className={styles.form__btn}
      >
        {text}
      </button>
    </div>
  );
};

FormButton.defaultProps = {
  text: 'Submit',
  type: 'submit',
};

export default FormButton;
