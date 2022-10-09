import Link from 'next/link';
import Image from 'next/image';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

import Meta from '@/components/Meta';
import StarRating from '@/components/StarRating';
import styles from '@/styles/TopAlbums.module.scss';
import { getTopAlbums } from '@/services/albumService';

const TopAlbums = ({ albums }) => {
  console.log(albums)
  return (
    <>
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
            {albums?.map((item) => {
              console.log(item);
              const {id: _id, slug, image, } = item;
              return (
                <tr>
                  <td>1</td>
                  <td>
                    <Image
                      src='/img/banner.jpg'
                      width={100}
                      height={100}
                      objectFit='cover'
                      alt=''
                    />
                  </td>
                  <td>
                    <div className={styles.albumInfo}>
                      <Link href={`/albums/slug`} passHref>
                        <a className={styles.albumLink}>Made in lagos</a>
                      </Link>
                      <div className={styles.artist}>Wizkid</div>
                    </div>
                  </td>
                  <td>5</td>
                  <td className={styles.ratingContainer}>
                    <StarRating value={5} className={styles.rating} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await getTopAlbums();

  return {
    props: {
      albums: data.albums,
    },
  };
};

export default TopAlbums;
