import { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import MenuButton from './MenuButton';

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
      {!!currentUser ? (
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
          <MenuButton
            label='Logout'
            onClick={logoutHandler}
          />
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
