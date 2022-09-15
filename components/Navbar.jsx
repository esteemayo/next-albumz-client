import Link from 'next/link';
import { useState } from 'react';
// import { SearchIcon } from '@mui/material';

import styles from '@/styles/Navbar.module.scss';
// #5a6bf6

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }

  return (
    <nav
      className={
        isScrolled ? `${styles.navbar} ${styles.scrolled}` : `${styles.navbar}`
      }
    >
      <div className={styles.navbar__left}>
        <div className={styles.logo}>ALBUMZ</div>
        <ul className={styles.list}>
          <li className={styles.list__items}>
            <Link href='/albums' passHref className={styles.navbar__link}>
              Albums
            </Link>
          </li>
          <li className={styles.list__items}>
            <Link href='/tags' passHref className={styles.navbar__link}>
              Tags
            </Link>
          </li>
          <li className={styles.list__items}>
            <Link href='/albums/top' passHref className={styles.navbar__link}>
              Top Albums
            </Link>
          </li>
          <li className={styles.list__items}>
            <Link href='/account' passHref className={styles.navbar__link}>
              Account
            </Link>
          </li>
          <li className={styles.list__items}>
            <Link href='/login' passHref className={styles.navbar__link}>
              Login
            </Link>
          </li>
          <li className={styles.list__items}>
            <Link href='/login' passHref className={styles.navbar__link}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.navbar__right}>
        <form className={styles.search}>
          <input type='search' className={styles.search__input} />
        </form>
        {/* <SearchIcon /> */}

        <div
          className={
            toggleMenu
              ? `${styles.hamburger} ${styles.active}`
              : `${styles.hamburger}`
          }
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
