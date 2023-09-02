import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Link from 'next/link';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Image from 'next/image';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PropTypes from 'prop-types';

import styles from '@/styles/Account.module.scss';

const Sidebar = ({ avatar, currentUser }) => {
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
        <li className={`${styles.list__item} ${styles.active}`}>
          <HomeOutlinedIcon className={styles.itemIcon} />
          <Link href='/auth/account' passHref>
            <a className={styles.itemLink}>Account</a>
          </Link>
        </li>
        <li className={styles.list__item}>
          <KeyOutlinedIcon className={styles.itemIcon} />
          <Link href='/auth/account/password' passHref>
            <a className={styles.itemLink}>Password</a>
          </Link>
        </li>
        <li className={styles.list__item}>
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
};

export default Sidebar;
