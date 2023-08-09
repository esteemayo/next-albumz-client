import PropTypes from 'prop-types';
import styles from '@/styles/Sidebar.module.scss';

const DarkMode = ({ icon, onToggle }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.darkmode} onClick={toggleDarkmode}>
        {icon}
      </div>
    </div>
  );
};

DarkMode.propTypes = {
  icon: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DarkMode;
