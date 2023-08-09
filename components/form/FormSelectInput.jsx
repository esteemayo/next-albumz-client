import styles from '@/styles/FormSelectInput.module.scss';

const FormSelectInput = ({ name, text, options, ...rest }) => {
  return (
    <div className={styles.form__group}>
      <select {...rest} name={name} className={styles.form__select}>
        <option value=''>{text}</option>
        {options?.map((option) => {
          return (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelectInput;
