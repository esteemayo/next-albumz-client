import Link from 'next/link';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import styles from '@/styles/Pagination.module.scss';

const Pagination = ({ page, total, numberOfPages }) => {
  const renderPagination = () => {
    if (page === 1 && page === numberOfPages) return null;
    if (page === 1) {
      return (
        <div className={styles.left}>
          <span className={styles.currentPage}>{page}</span>
          <Link href={`/albums?page=${page + 1}`} passHref>
            <a>
              <ArrowForwardIosOutlinedIcon className={styles.nextPage} />
            </a>
          </Link>
          <p className={styles.pageInfo}>Page {page} of {total} total results</p>
        </div>
      );
    } else if (page !== numberOfPages) {
      return (
        <div className={styles.left}>
          <Link href={`/albums?page=${page - 1}`} passHref>
            <a>
              <ArrowBackIosNewOutlinedIcon className={styles.prevPage} />
            </a>
          </Link>
          <span className={styles.currentPage}>{page}</span>
          <Link href={`/albums?page=${page + 1}`} passHref>
            <a>
              <ArrowForwardIosOutlinedIcon className={styles.nextPage} />
            </a>
          </Link>
          <p className={styles.pageInfo}>Page {page} of {total} total results</p>
        </div>
      );
    } else {
      return (
        <div className={styles.left}>
          <Link href={`/albums?page=${page - 1}`} passHref>
            <a>
              <ArrowBackIosNewOutlinedIcon className={styles.prevPage} />
            </a>
          </Link>
        <span className={styles.currentPage}>{page}</span>
        <p className={styles.pageInfo}>Page {page} of {total} total results</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.pagination}>
      {renderPagination()}
      <div className={styles.right}>
        <span>Items</span>
        <input type='number' defaultValue={1} />
      </div>
    </div>
  );
};

export default Pagination;
