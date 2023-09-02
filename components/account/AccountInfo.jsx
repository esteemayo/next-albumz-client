import Image from 'next/image';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const AccountInfo = ({ src, currentUser, styles }) => {
  return (
    <div className={styles.userContainer}>
      <Avatar
        src={src}
        styles={styles}
        alt={currentUser?.username}
      />
      <h2 className={styles.userName}>{currentUser?.name}</h2>
    </div>
  );
};

AccountInfo.propTypes = {
  src: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export default AccountInfo;
