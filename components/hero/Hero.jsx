import Link from 'next/link';
import styles from '@/styles/Hero.module.scss';

const Hero = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__text}>
        <h1 className={styles.heading__primary}>
          <span className={styles.heading__main}>
            Manage your music collection
          </span>
          <span className={styles.heading__sub}>With Albumz</span>
        </h1>
        <Link href='/albums' passHref>
          Get started
        </Link>
      </div>
    </header>
  );
};

export default Hero;
