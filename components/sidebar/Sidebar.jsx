import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import Search from '@/components/sidebar/Search';
import MenuItems from '@/components/sidebar/MenuItems';

import { logoutUser } from '@/features/auth/authSlice';
import { dark, light } from '@/features/darkMode/darkModeSlice';
import { closeMenu } from '@/features/toggle/toggleSlice';

import styles from '@/styles/Sidebar.module.scss';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

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
    darkMode === 'dark' ? dispatch(light('light')) : dispatch(dark('dark'));
  }, [dispatch]);

  return (
    <aside
      className={
        menuOpen ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`
      }
    >
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
        <div className={styles.wrapper}>
          <div className={styles.darkmode} onClick={toggleDarkmode}>
            {darkMode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
          </div>
        </div>
      </>
    </aside>
  );
};

export default Sidebar;
