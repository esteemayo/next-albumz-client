import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import styles from '@/styles/Sidebar.module.scss';
import { closeMenu } from '@/features/toggle/toggleSlice';
import { toggle } from '@/features/darkMode/darkModeSlice';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      router.push(`/albums/search?q=${query}`);
      setQuery('');
      dispatch(closeMenu());
    }
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
            <Link href='/albums' passHref className={styles.sidebar__link}>
              Albums
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/albums/tags' passHref className={styles.sidebar__link}>
              Tags
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/albums/top' passHref className={styles.sidebar__link}>
              Top Albums
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/auth/account' passHref className={styles.sidebar__link}>
              Account
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/auth/login' passHref className={styles.sidebar__link}>
              Login
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='#' passHref className={styles.sidebar__link}>
              Logout
            </Link>
          </li>
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
          <div className={styles.darkmode} onClick={() => dispatch(toggle())}>
            {darkMode ? <DarkModeOutlined /> : <LightModeOutlined />}
          </div>
        </div>
      </>
    </aside>
  );
};

export default Sidebar;
