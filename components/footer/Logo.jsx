import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Footer.module.scss';

const Logo = () => {
  return (
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
  );
};

export default Logo;
