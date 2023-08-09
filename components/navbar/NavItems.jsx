import PropTypes from 'prop-types';
import NavItem from './NavItem';

import styles from '@/styles/Navbar.module.scss';

const NavItems = ({ currentUser, onClick }) => {
  return (
    <ul className={styles.list}>
      <NavItem url='/albums' label='Albums' />
      {currentUser ? (
        <>
          <NavItem url='/genres' label='Genres' />
          <NavItem url='/albums/top' label='Top Albums' />
          <NavItem url='/auth/account' label='Account' />
          <NavButton label='Logout' onAction={onClick} />
        </>
      ) : (
        <NavItem url='/auth/login' label='Login' />
      )}
    </ul>
  );
};

NavItems.propTypes = {
  currentUser: PropTypes.object,
  onClick: PropTypes.func,
};

export default NavItems;
