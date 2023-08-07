import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { useRouter } from 'next/router';

import Spinner from '@/components/Spinner';
import ClientOnly from '@/components/ClientOnly';
import styles from '@/styles/Albums.module.scss';
import { searchAlbums } from '@/services/albumService';

const AlbumCard = lazy(() => import('@/components/AlbumCard'));

const SearchPage = ({ albums }) => {
  const { query } = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.searchWrapper}>
        {albums.length > 0 && <h1>Search results for &quot;<span>{query.q}</span> &quot;</h1>}
        {albums.length === 0 && <h3>No search result for &quot;<span>{query.q}</span> &quot;</h3>}
      </div>
      <div className={styles.container}>
        <Suspense fallback={<Spinner />}>
          {albums?.map((item) => {
            return <AlbumCard key={item._id} album={item} />;
          })}
        </Suspense>
      </div>
    </main>
  );
};

SearchPage.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.array.isRequired,
      info: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      ratingsAverage: PropTypes.number.isRequired,
      ratingsQuantity: PropTypes.number.isRequired,
    }),
  ),
};

export const getServerSideProps = async ({ query: { q } }) => {
  const { data } = await searchAlbums(q);

  return {
    props: {
      albums: data.albums,
    },
  };
};

export default SearchPage;
