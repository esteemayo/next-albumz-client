import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/Modal';
import AddButton from '@/components/AddButton';
import AlbumCard from '@/components/AlbumCard';
import AlbumForm from '@/components/AlbumForm';
import Pagination from '@/components/Pagination';
import styles from '@/styles/Albums.module.scss';
import { getAlbums } from '@/services/albumService';

const Albums = ({ albums }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {albums?.map((item => {
          return <AlbumCard key={item._id} {...item} />;
        }))}
      </div>
      <Pagination />
      
      <AddButton text='New album' onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={setShowModal}>
          <AlbumForm />
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

export const getStaticProps = async () => {
  const { data } = await getAlbums();

  return {
    props: {
      albums: data.albums,
    },
    revalidate: 1,
  };
};

export default Albums;
