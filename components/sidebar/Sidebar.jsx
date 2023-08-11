import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import DarkMode from '@/components/sidebar/DarkMode';
import Search from '@/components/sidebar/Search';
import MenuItems from '@/components/sidebar/MenuItems';

import { dark, light } from '@/features/darkMode/darkModeSlice';
import { logoutUser } from '@/features/auth/authSlice';
import { closeMenu } from '@/features/toggle/toggleSlice';

import styles from '@/styles/Sidebar.module.scss';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { mode } = useSelector((state) => ({ ...state.mode }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [query, setQuery] = useState('');

  const handleClose = useCallback(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    router.push('/');
  }, [router, dispatch]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();

    if (query) {
      router.push(`/albums/search?q=${query}`);
      setQuery('');
      dispatch(closeMenu());
    }
  }, [query, router, dispatch]);

  const toggleDarkmode = useCallback(() => {
    darkMode === 'dark' ?
      dispatch(light('light')) :
      dispatch(dark('dark'));
  }, [dark, light, darkMode, dispatch]);

  const toggleClasses = useMemo(() => {
    return menuOpen ?
      `${styles.sidebar} ${styles.active}` :
      `${styles.sidebar}`;
  }, [menuOpen]);

  const modeIcon = useMemo(() => {
    return mode === 'dark' ?
      <LightModeOutlined /> :
      <DarkModeOutlined />;
  }, [mode]);

  return (
    <aside className={toggleClasses}>
      <>
        <MenuItems
          currentUser={user}
          onClose={handleClose}
          onAction={handleLogout}
        />
        <Search
          value={query}
          onChange={(value) => setQuery(value)}
          onSubmit={handleSearch}
        />
        <DarkMode
          icon={modeIcon}
          onToggle={toggleDarkmode}
        />
      </>
    </aside>
  );
};

export default Sidebar;
