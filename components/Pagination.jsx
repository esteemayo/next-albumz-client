import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import styles from '@/styles/Pagination.module.scss';

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
        <ArrowBackIosNewOutlinedIcon className={styles.prevPage} />
        <span className={styles.currentPage}>6</span>
        <ArrowForwardIosOutlinedIcon className={styles.nextPage} />
        <p className={styles.pageInfo}>Page 6 of 380 total results</p>
      </div>
      <div className={styles.right}>
        <span>Items</span>
        <input type='number' defaultValue={1} />
      </div>
    </div>
  );
};

export default Pagination;
