import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/Navbar.module.scss';

const NavItem = ({ url, label }) => {
  return (
    <li className={styles.list__items}>
      <Link href={url} passHref>
        <a className={styles.navbar__link}>{label}</a>
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavItem;
