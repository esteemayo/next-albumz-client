import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Image from 'next/image';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PropTypes from 'prop-types';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { useRouter } from 'next/router';

import MenuItems from './MenuItems';

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
      <MenuItems styles={styles} />
    </div>
  );
};

Sidebar.propTypes = {
  avatar: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export default Sidebar;
