import Link from 'next/link';
import { useState } from 'react';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import { getAlbums } from '@/services/albumService';
import styles from '@/styles/Pagination.module.scss';

const Pagination = ({ page, total, numberOfPages, setAlbumList }) => {
  const [limit, setLimit] = useState(6);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await getAlbums(page, limit);
      setAlbumList(data.albums);
    } catch (err) {
      console.log(err);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type='number'
            value={limit}
            onChange={(e) => setLimit(+e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Pagination;
