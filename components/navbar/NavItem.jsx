import Link from 'next/link';

const NavItem = ({ url, label }) => {
  return (
    <li className={styles.list__items}>
      <Link href={url} passHref>
        <a className={styles.navbar__link}>{label}</a>
      </Link>
    </li>
  );
};

export default NavItem;
