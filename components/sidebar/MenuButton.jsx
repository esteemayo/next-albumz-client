import PropTypes from 'prop-types';
import styles from '@/styles/Sidebar.module.scss';

const MenuButton = ({ label, onClick }) => {
  return (
    <li className={styles.list__items}>
      <button
        onClick={onClick}
        className={styles.btn__logout}
      >
        {label}
      </button>
    </li>
  );
};

MenuButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default MenuButton;
