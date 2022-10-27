import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import http from '@/services/httpService';
import AddButton from '@/components/AddButton';
import AlbumCard from '@/components/AlbumCard';
import AlbumForm from '@/components/AlbumForm';
import Pagination from '@/components/Pagination';
import styles from '@/styles/Albums.module.scss';
import { getAlbums } from '@/services/albumService';
import { getAllGenres } from '@/services/genreService';

const Albums = ({ albums, genres, page, total, numberOfPages }) => {
  const router = useRouter();
  // console.log(router)
  // console.log(typeof router.query.page)
  // console.log(typeof page)
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [showModal, setShowModal] = useState(false);
  const [albumList, setAlbumList] = useState(albums)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {albumList?.map((item => {
          return <AlbumCard key={item?._id} album={item} />;
        }))}
      </div>

      <Pagination
        page={page}
        total={total}
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

export const getServerSideProps = async ({ query: { page } }) => {
  // const { data } = await getAlbums(page);
  const { data } = await http.get(`http://localhost:9797/api/v1/albums?page=${page}&limit=6`);
  const { data: { genres } } = await getAllGenres();

  return {
    props: {
      genres,
      albums: data.albums,
      page: data.currentPage,
      total: data.totalAlbums,
      numberOfPages: data.numberOfPages,
    },
  };
};

export default Albums;
