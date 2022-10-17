import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Meta from './Meta';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DarkMode from './DarkMode';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Meta />
      <Navbar />
      <ToastContainer />
      <Sidebar />
      <DarkMode />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
