import { useMemo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import Logo from '@/components/footer/Logo';
import MenuItems from '@/components/footer/MenuItems';

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
        <MenuItems user={user} />
      </div>
      <p className={styles.footer__copyright}>
        Copyright &copy; {year} <Link href='/' passHref>Albumz Inc.</Link> All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
