import { useMemo } from 'react';
import PropTypes from 'prop-types';

import styles from '@/styles/Navbar.module.scss';

const Hamburger = ({ isOpen, onClick }) => {
  const activeClasses = useMemo(() => {
    return isOpen ?
      `${styles.hamburger} ${styles.active}` :
      `${styles.hamburger}`;
  }, [isOpen]);

  return (
    <div className={activeClasses} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Hamburger;
