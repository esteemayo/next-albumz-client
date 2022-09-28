import ChipInput from 'material-ui-chip-input';
import styles from '@/styles/FormChipInput.module.scss';

const FormChipInput = ({ name, value, placeholder, ...rest }) => {
  return (
    <div className={styles.form__group}>
      <ChipInput
        {...rest}
        fullWidth
        name={name}
        value={value}
        variant='outlined'
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormChipInput;
