import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/router';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

import MenuItem from './MenuItem';

const MenuItems = ({ styles }) => {
  const { pathname } = useRouter();

  const inactiveLink = styles.list__item;
  const activeLink = `${inactiveLink} ${styles.active}`;

  return (
    <ul className={styles.list}>
      <MenuItem
        url='/auth/account'
        icon={HomeOutlinedIcon}
        label='Account'
        styles={styles}
        className={pathname === '/auth/account' ? activeLink : inactiveLink}
      />
      <MenuItem
        url='/auth/account/password'
        icon={KeyOutlinedIcon}
        label='Password'
        styles={styles}
        className={pathname.includes('/password') ? activeLink : inactiveLink}
      />
      <MenuItem
        url='/users/dashboard'
        icon={DashboardOutlinedIcon}
        label='Dashboard'
        styles={styles}
        className={pathname.includes('/users/dashboard') ? activeLink : inactiveLink}
      />
    </ul>
  );
};

MenuItems.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default MenuItems;
