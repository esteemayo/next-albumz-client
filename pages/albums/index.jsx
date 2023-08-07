import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import AddButton from '@/components/AddButton';
import AlbumForm from '@/components/AlbumForm';
import Pagination from '@/components/Pagination';
import ClientOnly from '@/components/ClientOnly';
import styles from '@/styles/Albums.module.scss';
import { getAlbums } from '@/services/albumService';
import { getAllGenres } from '@/services/genreService';

const AlbumCard = dynamic(() => import('@/components/AlbumCard'), { ssr: false });

const Albums = ({ albums, genres, page, limit, total, numberOfPages }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [showModal, setShowModal] = useState(false);
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
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.errorMsg}>There are no albums in the database...</h1>
        </div>
      </main>
    )
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

        {user && (
          <AddButton
            text='New album'
            onClick={() => setShowModal(true)}
          />
        )}

        {showModal && (
          <Modal onClose={setShowModal}>
            <AlbumForm
              genres={genres}
              onClose={setShowModal}
              setAlbumList={setAlbumList}
            />
          </Modal>
        )}
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
