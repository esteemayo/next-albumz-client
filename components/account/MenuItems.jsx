import Link from 'next/link';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/router';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

const MenuItems = ({ styles }) => {
  const { pathname } = useRouter();

  const inactiveLink = styles.list__item;
  const activeLink = `${inactiveLink} ${styles.active}`;

  return (
    <ul className={styles.list}>
      <li className={pathname === '/auth/account' ? activeLink : inactiveLink}>
        <HomeOutlinedIcon className={styles.itemIcon} />
        <Link href='/auth/account' passHref>
          <a className={styles.itemLink}>Account</a>
        </Link>
      </li>
      <li className={pathname.includes('/password') ? activeLink : inactiveLink}>
        <KeyOutlinedIcon className={styles.itemIcon} />
        <Link href='/auth/account/password' passHref>
          <a className={styles.itemLink}>Password</a>
        </Link>
      </li>
      <li className={pathname.includes('/users/dashboard') ? activeLink : inactiveLink}>
        <DashboardOutlinedIcon className={styles.itemIcon} />
        <Link href='/users/dashboard' passHref>
          <a className={styles.itemLink}>Dashboard</a>
        </Link>
      </li>
    </ul>
  );
};

MenuItems.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default MenuItems;
