import Image from 'next/image';
import PropTypes from 'prop-types';

const AccountInfo = ({ src, currentUser, styles }) => {
  return (
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
  );
};

AccountInfo.propTypes = {
  src: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export default AccountInfo;
