import { useSelector } from 'react-redux';

import Meta from './Meta';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DarkMode from './DarkMode';

const Layout = ({ children }) => {
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Meta />
      <Navbar />
      <Sidebar />
      <DarkMode />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
