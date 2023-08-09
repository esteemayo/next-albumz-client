import { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

import styles from '@/styles/Sidebar.module.scss';

const MenuItems = ({ currentUser, onClose, onAction }) => {
  const logoutHandler = useCallback(() => {
    onAction();
    onClose();
  }, [onAction, onClose]);

  return (
    <ul className={styles.list}>
      <MenuItem
        url='/albums'
        label='Albums'
        onClose={onClose}
      />
      {currentUser ? (
        <>
          <MenuItem
            url='/genres'
            label='Genres'
            onClose={onClose}
          />
          <MenuItem
            url='/albums/top'
            label='Top Albums'
            onClose={onClose}
          />
          <MenuItem
            url='/auth/account'
            label='Account'
            onClose={onClose}
          />
          <li className={styles.list__items}>
            <button
              onClick={logoutHandler}
              className={styles.btn__logout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <MenuItem
          url='/auth/login'
          label='Login'
          onClose={onClose}
        />
      )}
    </ul>
  );
};

MenuItems.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func,
};

export default MenuItems;
