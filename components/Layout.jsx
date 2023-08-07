import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Meta from './Meta';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ClientOnly from './ClientOnly';
import Footer from './Footer';
import DarkMode from './DarkMode';

import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={darkMode === 'dark' ? 'app dark' : 'app'}>
      <Meta />
      <ClientOnly>
        <Navbar />
        <ToastContainer />
        <Sidebar />
      </ClientOnly>
      <DarkMode />
      {children}
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  );
};

export default Layout;
