import PropTypes from 'prop-types';
import styles from '@/styles/AddButton.module.scss';

const AddButton = ({ text, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button 
        className={styles.btn__new} 
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
