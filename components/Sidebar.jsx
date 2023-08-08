import { useState } from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@/styles/Sidebar.module.scss';
import { logoutUser } from '@/features/auth/authSlice';
import { closeMenu } from '@/features/toggle/toggleSlice';
import { dark, light } from '@/features/darkMode/darkModeSlice';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  const [query, setQuery] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      router.push(`/albums/search?q=${query}`);
      setQuery('');
      dispatch(closeMenu());
    }
  };

  const toggleDarkmode = () => {
    darkMode === 'dark' ? dispatch(light('light')) : dispatch(dark('dark'));
  };

  return (
    <aside
      className={
        menuOpen ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`
      }
    >
      <>
        <ul className={styles.list}>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/albums' passHref>
              <a className={styles.sidebar__link}>
                Albums
              </a>
            </Link>
          </li>
          {user ? (
            <>
              <li
                className={styles.list__items}
                onClick={() => dispatch(closeMenu())}
              >
                <Link href='/genres' passHref>
                  <a className={styles.sidebar__link}>
                    Genres
                  </a>
                </Link>
              </li>
              <li
                className={styles.list__items}
                onClick={() => dispatch(closeMenu())}
              >
                <Link href='/albums/top' passHref>
                  <a className={styles.sidebar__link}>
                    Top Albums
                  </a>
                </Link>
              </li>
              <li
                className={styles.list__items}
                onClick={() => dispatch(closeMenu())}
              >
                <Link href='/auth/account' passHref>
                  <a className={styles.sidebar__link}>
                    Account
                  </a>
                </Link>
              </li>
              <li className={styles.list__items}>
                <button
                  onClick={() => {
                    handleLogout();
                    dispatch(closeMenu());
                  }}
                  className={styles.btn__logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li
              className={styles.list__items}
              onClick={() => dispatch(closeMenu())}
            >
              <Link href='/auth/login' passHref>
                <a className={styles.sidebar__link}>
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
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
