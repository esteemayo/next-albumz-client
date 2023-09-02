import Image from 'next/image';
import MenuItems from './MenuItems';

const Sidebar = ({ avatar, currentUser, styles }) => {
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
