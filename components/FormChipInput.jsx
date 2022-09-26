import ChipInput from 'material-ui-chip-input';

const FormChipInput = ({ name, value, placeholder, ...rest }) => {
  return (
    <ChipInput
      {...rest}
      fullWidth
      name={name}
      value={value}
      variant='outlined'
      placeholder={placeholder}
    />
  );
};

export default FormChipInput;
