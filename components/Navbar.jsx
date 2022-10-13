import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@/styles/Navbar.module.scss';
import { logoutUser } from '@/features/auth/authSlice';
import { toggleMenu } from '@/features/toggle/toggleSlice';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));

  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  const toggleScroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
  };

  useEffect(() => {
    document.addEventListener('scroll', toggleScroll);
    return () => document.removeEventListener('scroll', toggleScroll);
  }, []);

  return (
    <nav
      className={
        isScrolled
          ? `${styles.navbar} ${styles.scrolled}`
          : `${styles.navbar}`
          ? menuOpen
            ? `${styles.navbar} ${styles.active}`
            : `${styles.navbar}`
          : ''
      }
    >
      <div className={styles.navbar__left}>
        <div className={styles.logo}>
          <Link href='/' passHref>
            <a className={styles.logo__link}>
              <Image
                src='/img/logo-x1.png'
                width={120}
                height={50}
                objectFit='contain'
                alt=''
              />
            </a>
          </Link>
        </div>
        <ul className={styles.list}>
          <li className={styles.list__items}>
            <Link href='/albums' passHref className={styles.navbar__link}>
              Albums
            </Link>
          </li>
          {user ? (
            <>
              <li className={styles.list__items}>
                <Link href='/genres' passHref className={styles.navbar__link}>
                  Genres
                </Link>
              </li>
              <li className={styles.list__items}>
                <Link href='/albums/top' passHref className={styles.navbar__link}>
                  Top Albums
                </Link>
              </li>
              <li className={styles.list__items}>
                <Link href='/auth/account' passHref className={styles.navbar__link}>
                  Account
                </Link>
              </li>
              <li className={styles.list__items} onClick={handleLogout}>
                <Link href='#' passHref className={styles.navbar__link}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.list__items}>
              <Link href='/auth/login' passHref className={styles.navbar__link}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.navbar__right}>
        <form className={styles.search}>
          <input type='search' className={styles.search__input} />
          <SearchIcon className={styles.search__icon} />
        </form>

        <div
          className={
            menuOpen
              ? `${styles.hamburger} ${styles.active}`
              : `${styles.hamburger}`
          }
          onClick={() => dispatch(toggleMenu())}
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
