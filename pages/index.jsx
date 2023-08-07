import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Hero from '@/components/Hero';
import AddButton from '@/components/AddButton';
import Modal from '@/components/Modal';
import ClientOnly from '@/components/ClientOnly';
import AlbumForm from '@/components/AlbumForm';

import { getTopReviews } from '@/services/reviewService';
import { getAllGenres } from '@/services/genreService';
import { getFeaturedAlbums } from '@/services/albumService';

const TopReviews = dynamic(() => import('@/components/TopReviews'), { ssr: false });
const FeaturedAlbums = dynamic(() => import('@/components/FeaturedAlbums'), { ssr: false });

const Home = ({ genres, reviews, featuredAlbums }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <ClientOnly>
      <Hero />
      <FeaturedAlbums albums={featuredAlbums} />
      <TopReviews reviews={reviews} />
      {user && (
        <AddButton
          text='New album'
          onClick={() => setShowModal(true)}
        />
      )}
      {showModal && (
        <Modal onClose={setShowModal}>
          <AlbumForm genres={genres} onClose={setShowModal} />
        </Modal>
      )}
    </ClientOnly>
  );
};

export const getStaticProps = async () => {
  const { data } = await getFeaturedAlbums();
  const { data: { genres } } = await getAllGenres();
  const {
    data: { reviews },
  } = await getTopReviews();

  return {
    props: {
      genres,
      reviews,
      featuredAlbums: data.albums,
    },
    revalidate: 1,
  };
};

export default Home;
