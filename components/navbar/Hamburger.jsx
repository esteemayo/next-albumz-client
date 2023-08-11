import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/Navbar.module.scss';

const Hamburger = ({ isOpen, onClick }) => {
  return (
    <div
      className={
        isOpen
          ? `${styles.hamburger} ${styles.active}`
          : `${styles.hamburger}`
      }
      onClick={onClick}
    >
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
