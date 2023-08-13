import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import PropTypes from 'prop-types';

import ClientOnly from '@/components/ClientOnly';
import Meta from '@/components/Meta';
import StarRating from '@/components/StarRating';

import { parseCookie } from '@/utils/index';
import { getTopAlbums } from '@/services/albumService';

import styles from '@/styles/TopAlbums.module.scss';

const TopAlbums = ({ albums }) => {
  const [albumList, setAlbumList] = useState(albums);

  return (
    <ClientOnly>
      <Meta title='Top 10 Albums - Albumz Music Entertainment' />
      <section className={styles.top}>
        <div className={styles.headerBox}>
          <h1 className={styles.heading}>Daily top 10 Albums</h1>
          <p className={styles.headingText}>Your daily update of the most rated albums right now.</p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <TagOutlinedIcon className={styles.tableOrder} />
              </th>
              <th colSpan='2'>Album</th>
              <th>Reviews</th>
              <th>Avg Ratings</th>
            </tr>
          </thead>
          <tbody>
            {albumList?.map((item, index) => {
              const {_id: id, slug, image, title, artist, reviews, avgRating} = item;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={image ?? '/img/default-album-1.webp'}
                      width={100}
                      height={100}
                      objectFit='cover'
                      alt=''
                    />
                  </td>
                  <td>
                    <div className={styles.albumInfo}>
                      <Link href={`/albums/${slug}`} passHref>
                        <a className={styles.albumLink}>{title}</a>
                      </Link>
                      <div className={styles.artist}>{artist}</div>
                    </div>
                  </td>
                  <td>{reviews?.length}</td>
                  <td className={styles.ratingContainer}>
                    <StarRating value={avgRating} className={styles.rating} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </ClientOnly>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);

  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const { data } = await getTopAlbums(token);

  return {
    props: {
      albums: data.albums,
    },
  };
};

TopAlbums.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      reviews: PropTypes.array.isRequired,
      avgRating: PropTypes.number.isRequired,
    }),
  ),
};

export default TopAlbums;
