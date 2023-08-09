import { useCallback, useState } from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '@/features/auth/authSlice';
import { dark, light } from '@/features/darkMode/darkModeSlice';
import MenuItems from '@/components/sidebar/MenuItems';
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
        <div>
          <form onSubmit={handleSearch} className={styles.search}>
            <input
              type='search'
              value={query}
              placeholder='Search albums...'
              className={styles.search__input}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon className={styles.search__icon} />
          </form>
        </div>
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
