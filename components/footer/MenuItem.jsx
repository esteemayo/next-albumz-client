import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/Footer.module.scss';

const MenuItem = ({ url, label }) => {
  return (
    <li className={styles.footer__item}>
      <Link href={url} passHref>{label}</Link>
    </li>
  );
};

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MenuItem;
