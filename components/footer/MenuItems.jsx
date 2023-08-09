import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

import styles from '@/styles/Footer.module.scss';

const MenuItems = ({ currentUser }) => {
  return (
    <ul className={styles.footer__list}>
      <MenuItem url='/albums' label='Albums' />
      {currentUser && (
        <>
          <MenuItem url='/genres' label='Genres' />
          <MenuItem url='/albums/top' label='Top albums' />
          <MenuItem url='/auth/account' label='Account' />
          <MenuItem url='/users/dashboard' label='Dashboard' />
        </>
      )}
      <MenuItem url='#' label='Cookie warning' />
      <MenuItem url='#' label='Support' />
      <MenuItem url='#' label='Feedback' />
    </ul>
  );
};

MenuItems.propTypes = {
  currentUser: PropTypes.object,
};

export default MenuItems;
