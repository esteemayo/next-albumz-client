import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Navbar.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href='/' passHref>
        <a className={styles.logo__link}>
          <Image
            src='/img/logo-x1.png'
            width={120}
            height={50}
            objectFit='contain'
            alt=''
          />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
