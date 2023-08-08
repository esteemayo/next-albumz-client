import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '@/features/auth/authSlice';
import { toggleMenu } from '@/features/toggle/toggleSlice';

import Search from '@/components/Search';

import styles from '@/styles/Navbar.module.scss';

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
            <Link href='/albums' passHref>
              <a className={styles.navbar__link}>
                Albums
              </a>
            </Link>
          </li>
          {user ? (
            <>
              <li className={styles.list__items}>
                <Link href='/genres' passHref>
                  <a className={styles.navbar__link}>
                    Genres
                  </a>
                </Link>
              </li>
              <li className={styles.list__items}>
                <Link href='/albums/top' passHref>
                  <a className={styles.navbar__link}>
                    Top Albums
                  </a>
                </Link>
              </li>
              <li className={styles.list__items}>
                <Link href='/auth/account' passHref>
                  <a className={styles.navbar__link}>
                    Account
                  </a>
                </Link>
              </li>
              <li className={styles.list__items}>
                <button
                  onClick={handleLogout}
                  className={styles.btn__logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className={styles.list__items}>
              <Link href='/auth/login' passHref>
                <a className={styles.navbar__link}>
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.navbar__right}>
        <Search />

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
