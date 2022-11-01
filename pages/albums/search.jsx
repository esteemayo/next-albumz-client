import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import AlbumCard from '@/components/AlbumCard';
import styles from '@/styles/Albums.module.scss';
import { searchAlbums } from '@/services/albumService';

const SearchPage = ({ albums }) => {
  const { query } = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.searchWrapper}>
        {albums.length > 0 && <h1>Search results for "<span>{query.q}</span> "</h1>}
        {albums.length === 0 && <h3>No search result for "<span>{query.q}</span> "</h3>}
      </div>
      <div className={styles.container}>
        {albums?.map((item) => {
          return <AlbumCard key={item._id} album={item} />;
        })}
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
