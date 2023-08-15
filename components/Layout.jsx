import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/Footer';
import DarkMode from '@/components/darkmode/DarkMode';

import ToastProvider from '@/providers/ToastProvider';

import Meta from './Meta';
import ClientOnly from './ClientOnly';

import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const { mode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={mode === 'dark' ? 'app dark' : 'app'}>
      <ClientOnly>
        <Meta />
        <Navbar />
        <ToastProvider />
        <Sidebar />
        <DarkMode />
      </ClientOnly>
      {children}
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  );
};

export default Layout;
