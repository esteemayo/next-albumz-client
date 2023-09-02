import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Image from 'next/image';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PropTypes from 'prop-types';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { useRouter } from 'next/router';

const Sidebar = ({ avatar, currentUser, styles }) => {
  const { pathname } = useRouter();

  const inactiveLink = styles.list__item;
  const activeLink = `${inactiveLink} ${styles.active}`;

  return (
    <div className={styles.left}>
      <div className={styles.userContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={avatar}
            width={80}
            height={80}
            objectFit='cover'
            alt={currentUser?.username}
          />
        </div>
        <h2 className={styles.userName}>{currentUser?.name}</h2>
      </div>
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
    </div>
  );
};

Sidebar.propTypes = {
  avatar: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  styles: PropTypes.any.isRequired,
};

export default Sidebar;
