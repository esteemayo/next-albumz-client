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

export default NavButton;
