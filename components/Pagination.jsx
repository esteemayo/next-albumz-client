import Link from 'next/link';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useCallback, useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import { getAlbums } from '@/services/albumService';

import styles from '@/styles/Pagination.module.scss';

const Pagination = ({ page, total, numberOfPages, setAlbumList }) => {
  const [limit, setLimit] = useState(6);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const { data } = await getAlbums(page, limit);
      limit > 0 && setAlbumList(data.albums);
    } catch (err) {
      console.log(err);
    }
  }, [limit, page, setAlbumList]);

  const renderPagination = () => {
    if (page === 1 && page === numberOfPages) return null;
    if (page === 1) {
      return (
        <div className={styles.left}>
          <span className={styles.currentPage}>{page}</span>
          <Link href={`/albums?page=${page + 1}&limit=${limit}`} passHref>
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
          <Link href={`/albums?page=${page - 1}&limit=${limit}`} passHref>
            <a>
              <ArrowBackIosNewOutlinedIcon className={styles.prevPage} />
            </a>
          </Link>
          <span className={styles.currentPage}>{page}</span>
          <Link href={`/albums?page=${page + 1}&limit=${limit}`} passHref>
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
          <Link href={`/albums?page=${page - 1}&limit=${limit}`} passHref>
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
            type='text'
            value={limit}
            onChange={(e) => setLimit(+e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Pagination;
