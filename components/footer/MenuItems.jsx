import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/Footer.module.scss';

const MenuItems = ({ currentUser }) => {
  return (
    <ul className={styles.footer__list}>
      <li className={styles.footer__item}>
        <Link href='/albums' passHref>Albums</Link>
      </li>
      {currentUser && (
        <>
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
        </>
      )}
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
  );
};

MenuItems.propTypes = {
  currentUser: PropTypes.object,
};

export default MenuItems;
