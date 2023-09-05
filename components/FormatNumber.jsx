import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const FormatNumber = ({ value }) => {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
    />
  );
};

FormatNumber.propTypes = {
  value: PropTypes.number.isRequired,
};

export default FormatNumber;
