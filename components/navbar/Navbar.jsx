import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import NavButton from '@/components/navbar/NavButton';
import NavItem from '@/components/navbar/NavItem';
import Hamburger from '@/components/navbar/Hamburger';

import Search from '@/components/Search';

import { logoutUser } from '@/features/auth/authSlice';
import { toggleMenu } from '@/features/toggle/toggleSlice';

import styles from '@/styles/Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));

  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    router.push('/');
  }, [router, dispatch]);

  const toggleScroll = useCallback(() => {
    setIsScrolled(window.scrollY === 0 ? false : true);
  }, []);

  const handleToggleMenu = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

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
          <NavItem url='/albums' label='Albums' />
          {user ? (
            <>
              <NavItem url='/genres' label='Genres' />
              <NavItem url='/albums/top' label='Top Albums' />
              <NavItem url='/auth/account' label='Account' />
              <NavButton label='Logout' onAction={handleLogout} />
            </>
          ) : (
            <NavItem url='/auth/login' label='Login' />
          )}
        </ul>
      </div>
      <div className={styles.navbar__right}>
        <Search />
        <Hamburger 
          isOpen={menuOpen}
          onClick={handleToggleMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
