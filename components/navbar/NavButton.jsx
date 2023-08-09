import PropTypes from 'prop-types';
import styles from '@/styles/Navbar.module.scss';

const NavButton = ({ label, onAction }) => {
  return (
    <li className={styles.list__items}>
      <button
        onClick={onAction}
        className={styles.btn__logout}
      >
        {label}
      </button>
    </li>
  );
};

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default NavButton;
