import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

import Meta from './Meta';
import Sidebar from './Sidebar';
import ClientOnly from './ClientOnly';
import DarkMode from './DarkMode';

import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={darkMode === 'dark' ? 'app dark' : 'app'}>
      <ClientOnly>
        <Meta />
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
