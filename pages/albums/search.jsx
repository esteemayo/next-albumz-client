import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import AlbumCard from '@/components/AlbumCard';
import styles from '@/styles/Albums.module.scss';
import { searchAlbums } from '@/services/albumService';

const SearchPage = ({ albums }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {albums?.map((item) => {
          return <AlbumCard key={item._id} {...item} />;
        })}
      </div>
    </main>
  );
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