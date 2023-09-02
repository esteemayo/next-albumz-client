import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AddButton from '@/components/button/AddButton';
import AlbumForm from '@/components/form/AlbumForm';
import AlbumModal from '@/components/modal/AlbumModal';

import Pagination from '@/components/Pagination';
import Spinner from '@/components/Spinner';
import ClientOnly from '@/components/ClientOnly';

import { getAlbums } from '@/services/albumService';
import { getAllGenres } from '@/services/genreService';

import { useAlbumModal } from '@/hooks/useAlbumModal';

import styles from '@/styles/Albums.module.scss';

const AlbumCard = dynamic(() => import('@/components/card/AlbumCard'), { ssr: false });

const Albums = ({
  albums,
  genres,
  page,
  limit,
  total,
  numberOfPages,
}) => {
  const { isOpen, onOpen, onClose } = useAlbumModal();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [albumList, setAlbumList] = useState(albums);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAlbums(page, limit);
        setAlbumList(data.albums);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [page, limit]);

  if (albumList.length < 1) {
    return (
      <ClientOnly>
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.errorMsg}>There are no albums in the database...</h1>
          </div>
        </main>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <main className={styles.main}>
        <div className={styles.container}>
          {albumList?.map((item => {
            return <AlbumCard key={item?._id} album={item} />;
          }))}
        </div>
        <Pagination
          page={page}
          total={total}
          setAlbumList={setAlbumList}
          numberOfPages={numberOfPages}
        />
        {!!user && (
          <AddButton
            text='New album'
            onClick={handleOpen}
          />
        )}
        <AlbumModal
          genres={genres}
          isOpen={isOpen}
          onClose={onClose}
        />
      </main>
    </ClientOnly>
  );
};

Albums.propTypes = {
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
  genres: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
};

export const getServerSideProps = async ({ query: { page, limit } }) => {
  const { data } = await getAlbums(page, limit);
  const { data: { genres } } = await getAllGenres();

  return {
    props: {
      genres,
      limit: data.limit,
      albums: data.albums,
      page: data.currentPage,
      total: data.totalAlbums,
      numberOfPages: data.numberOfPages,
    },
  };
};

export default Albums;
