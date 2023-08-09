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

export default Hamburger;
