import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/Sidebar.module.scss';

const MenuItems = ({ onClose, onAction }) => {
  return (
    <ul className={styles.list}>
      <li
        className={styles.list__items}
        onClick={onClose}
      >
        <Link href='/albums' passHref>
          <a className={styles.sidebar__link}>
            Albums
          </a>
        </Link>
      </li>
      {user ? (
        <>
          <li
            className={styles.list__items}
            onClick={onClose}
          >
            <Link href='/genres' passHref>
              <a className={styles.sidebar__link}>
                Genres
              </a>
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={onClose}
          >
            <Link href='/albums/top' passHref>
              <a className={styles.sidebar__link}>
                Top Albums
              </a>
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={onClose}
          >
            <Link href='/auth/account' passHref>
              <a className={styles.sidebar__link}>
                Account
              </a>
            </Link>
          </li>
          <li className={styles.list__items}>
            <button
              onClick={onAction}
              className={styles.btn__logout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li
          className={styles.list__items}
          onClick={onClose}
        >
          <Link href='/auth/login' passHref>
            <a className={styles.sidebar__link}>
              Login
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

MenuItems.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func,
};

export default MenuItems;
