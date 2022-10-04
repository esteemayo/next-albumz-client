import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import styles from '@/styles/Sidebar.module.scss';
import { closeMenu } from '@/features/toggle/toggleSlice';
import { toggle } from '@/features/darkMode/darkModeSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

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
          <form className={styles.search}>
            <input
              type='search'
              placeholder='Search albums...'
              className={styles.search__input}
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
