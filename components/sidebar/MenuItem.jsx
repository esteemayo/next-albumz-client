import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/Sidebar.module.scss';

const MenuItem = ({ url, label, onClose }) => {
  return (
    <Link href={url} passHref>
      <a className={styles.sidebar__link}>
         {label}
      </a>
    </Link>
  );
};

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MenuItem;
