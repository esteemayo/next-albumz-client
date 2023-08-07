import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Meta from './Meta';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DarkMode from './DarkMode';
import ClientOnly from './ClientOnly';
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
