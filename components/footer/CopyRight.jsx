import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/Footer.module.scss';

const CopyRight = ({ year }) => {
  return (
    <p className={styles.footer__copyright}>
      Copyright &copy; {year} <Link href='/' passHref>Albumz Inc.</Link> All rights reserved
    </p>
  );
};

CopyRight.propTypes = {
  year: PropTypes.number.isRequired,
};

export default CopyRight;
