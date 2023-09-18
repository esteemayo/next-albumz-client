import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Search from '@/components/sidebar/Search';
import MenuItems from '@/components/sidebar/MenuItems';

import { useMenu } from '@/hooks/useMenu';
import { useSearch } from '@/hooks/useSearch';

import { logoutUser } from '@/features/auth/authSlice';

import styles from '@/styles/Sidebar.module.scss';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  
  const { closeMenuHandler } = useMenu();
  const { query, handleChange, handleSearch } = useSearch();

  const handleSubmit = useCallback(() => {
    handleSearch();
    closeMenuHandler();
  }, [closeMenuHandler, handleSearch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    router.push('/');
  }, [router, dispatch]);

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
          onClose={closeMenuHandler}
          onAction={handleLogout}
        />
        {menuOpen && (
          <Search
            value={query}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </>
    </aside>
  );
};

export default Sidebar;
