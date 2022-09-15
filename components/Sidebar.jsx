import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@/styles/Sidebar.module.scss';
import { closeMenu } from '@/features/toggle/toggleSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));

  return (
    <div
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
            <Link href='/tags' passHref className={styles.sidebar__link}>
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
            <Link href='/account' passHref className={styles.sidebar__link}>
              Account
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/login' passHref className={styles.sidebar__link}>
              Login
            </Link>
          </li>
          <li
            className={styles.list__items}
            onClick={() => dispatch(closeMenu())}
          >
            <Link href='/login' passHref className={styles.sidebar__link}>
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
          </form>
        </div>
      </>
    </div>
  );
};

export default Sidebar;
