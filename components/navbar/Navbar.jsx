import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import NavItems from '@/components/navbar/NavItems';
import Logo from '@/components/navbar/Logo';
import DarkModeToggle from '@/components/darkmode/DarkModeToggle';
import Search from '@/components/Search';
import Hamburger from '@/components/navbar/Hamburger';

import { useMenu } from '@/hooks/useMenu';
import { useLogout } from '@/hooks/useLogout';

import styles from '@/styles/Navbar.module.scss';

const Navbar = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  
  const { logout } = useLogout();
  const { openMenuHandler } = useMenu();

  const [isScrolled, setIsScrolled] = useState(false);

  const toggleScroll = useCallback(() => {
    setIsScrolled(window.scrollY === 0 ? false : true);
  }, []);

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
      <div className={styles.wrapper}>
        <div className={styles.navbar__left}>
          <Logo />
          <NavItems
            currentUser={user}
            onClick={logout}
          />
        </div>
        <div className={styles.navbar__right}>
          <Search />
          <div className={styles.container}>
            <DarkModeToggle />
            <Hamburger 
              isOpen={menuOpen}
              onClick={openMenuHandler}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
