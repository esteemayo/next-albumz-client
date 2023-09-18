import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Search from '@/components/sidebar/Search';
import MenuItems from '@/components/sidebar/MenuItems';

import { useLogout } from '@/hooks/useLogout';
import { useMenu } from '@/hooks/useMenu';
import { useSearch } from '@/hooks/useSearch';

import { logoutUser } from '@/features/auth/authSlice';

import styles from '@/styles/Sidebar.module.scss';

const Sidebar = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { menuOpen } = useSelector((state) => ({ ...state.toggle }));
  
  const { closeMenuHandler } = useMenu();
  const { logout } = useLogout();
  const { query, handleChange, handleSearch } = useSearch(closeMenuHandler);

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
          onAction={logout}
        />
        {menuOpen && (
          <Search
            value={query}
            onChange={handleChange}
            onSubmit={handleSearch}
          />
        )}
      </>
    </aside>
  );
};

export default Sidebar;
