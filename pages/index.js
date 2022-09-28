import { useState } from 'react';

import Hero from '@/components/Hero';
import Modal from '@/components/Modal';
import AddButton from '@/components/AddButton';
import AlbumForm from '@/components/AlbumForm';
import GenreForm from '@/components/GenreForm';
import styles from '@/styles/Home.module.scss';
import TopReviews from '@/components/TopReviews';
import FeaturedAlbums from '@/components/FeaturedAlbums';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Hero />
      <FeaturedAlbums />
      <TopReviews />
      <AddButton text='New album' onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={setShowModal}>
          <AlbumForm />
          {/* <GenreForm type='genre' /> */}
        </Modal>
      )}
    </>
  );
};

export default Home;
