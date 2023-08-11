import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import NavItems from '@/components/navbar/NavItems';
import Logo from '@/components/navbar/Logo';
import DarkModeToggle from '@/components/darkmode/DarkModeToggle';
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

  const navClasses = useMemo(() => {
    return isScrolled
      ? `${styles.navbar} ${styles.scrolled}`
      : `${styles.navbar}`
      ? menuOpen
        ? `${styles.navbar} ${styles.active}`
        : `${styles.navbar}`
      : '';
  }, [isScrolled, menuOpen]);

  useEffect(() => {
    document.addEventListener('scroll', toggleScroll);
    return () => document.removeEventListener('scroll', toggleScroll);
  }, [toggleScroll]);

  return (
    <nav className={navClasses}>
      <div className={styles.navbar__left}>
        <Logo />
        <NavItems
          currentUser={user}
          onClick={handleLogout}
        />
      </div>
      <div className={styles.navbar__right}>
        <Search />
        <div>
          <DarkModeToggle />
          <Hamburger 
            isOpen={menuOpen}
            onClick={handleToggleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
