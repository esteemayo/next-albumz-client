import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import MenuItems from '@/components/footer/MenuItems';
import Logo from '@/components/footer/Logo';
import CopyRight from '@/components/footer/CopyRight';

import styles from '@/styles/Footer.module.scss';

const Footer = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__navigation}>
        <Logo />
        <MenuItems currentUser={user} />
      </div>
      <CopyRight year={year} />
    </footer>
  );
};

export default Footer;
