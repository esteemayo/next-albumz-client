import Image from 'next/image';
import styles from '@/styles/Spinner.module.scss';

const Spinner = () => {
  return (
    <section className={styles.spinner}>
      <Image
        src='/gif/loading-arrow.gif'
        width={100}
        height={100}
        alt='Spinner'
      />
    </section>
  );
};

export default Spinner;
