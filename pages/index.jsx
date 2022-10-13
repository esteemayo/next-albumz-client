import { useState } from 'react';
import { useSelector } from 'react-redux';

import Hero from '@/components/Hero';
import Modal from '@/components/Modal';
import AddButton from '@/components/AddButton';
import AlbumForm from '@/components/AlbumForm';
import TopReviews from '@/components/TopReviews';
import FeaturedAlbums from '@/components/FeaturedAlbums';
import { getTopReviews } from '@/services/reviewService';
import { getFeaturedAlbums } from '@/services/albumService';

const Home = ({ reviews, featuredAlbums }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <>
      <Hero />
      <FeaturedAlbums albums={featuredAlbums} />
      <TopReviews reviews={reviews} />
      {user && <AddButton text='New album' onClick={() => setShowModal(true)} />}
      {showModal && (
        <Modal onClose={setShowModal}>
          <AlbumForm onClose={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const { data } = await getFeaturedAlbums();
  const {
    data: { reviews },
  } = await getTopReviews();

  return {
    props: {
      reviews,
      featuredAlbums: data.albums,
    },
    revalidate: 1,
  };
};

export default Home;
