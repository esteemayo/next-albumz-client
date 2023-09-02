import Image from 'next/image';
import PropTypes from 'prop-types';

import MenuItems from './MenuItems';
import AccountInfo from './AccountInfo';

const Sidebar = ({ avatar, currentUser, styles }) => {
  return (
    <div className={styles.left}>
      <AccountInfo
        src={avatar}
        currentUser={currentUser}
        styles={styles}
      />
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
