import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__navigation}>
        <div className={styles.footer__logo}>
          <Link href='/' passHref>
            <a className={styles.footer__link}>
              <Image
                src='/img/logo-x2.png'
                width={200}
                height={70}
                objectFit='center'
                alt=''
              />
            </a>
          </Link>
        </div>
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <Link href='/albums' passHref>Albums</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='/genres' passHref>Genres</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='/albums/top' passHref>Top albums</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='/auth/account' passHref>Account</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='/users/dashboard' passHref>Dashboard</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='#' passHref>Cookie warning</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='#' passHref>Support</Link>
          </li>
          <li className={styles.footer__item}>
            <Link href='#' passHref>Feedback</Link>
          </li>
        </ul>
      </div>
      <p className={styles.footer__copyright}>
        Copyright &copy; {year} <Link href='/' passHref>Albumz Inc.</Link> All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
