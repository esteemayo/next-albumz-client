import Image from 'next/image';

import Meta from '@/components/Meta';
import styles from '@/styles/404.module.scss';

const NotFound = () => {
  return (
    <>
      <Meta title='Page Not Found - Albumz Music Entertainment' />
      <section className={styles.notfound}>
        <Image
          src='/img/404.png'
          width={1000}
          height={500}
          objectFit='cover'
          alt='Not Found'
        />
      </section>
    </>
  )
};

export default NotFound;
