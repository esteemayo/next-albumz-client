import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Search from '@/components/sidebar/Search';
import MenuItems from '@/components/sidebar/MenuItems';

import { logoutUser } from '@/features/auth/authSlice';
import { closeMenu } from '@/features/toggle/toggleSlice';

import styles from '@/styles/Sidebar.module.scss';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));

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

  const toggleClasses = useMemo(() => {
    return menuOpen ?
      `${styles.sidebar} ${styles.active}` :
      `${styles.sidebar}`;
  }, [menuOpen]);

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
      </>
    </aside>
  );
};

export default Sidebar;
