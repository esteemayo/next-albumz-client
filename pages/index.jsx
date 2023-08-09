import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import AddButton from '@/components/button/AddButton';
import AlbumForm from '@/components/albums/AlbumForm';

import Hero from '@/components/hero/Hero';
import ClientOnly from '@/components/ClientOnly';
import Modal from '@/components/Modal';

import { getTopReviews } from '@/services/reviewService';
import { getAllGenres } from '@/services/genreService';
import { getFeaturedAlbums } from '@/services/albumService';

const TopReviews = dynamic(() => import('@/components/TopReviews'), { ssr: false });
const FeaturedAlbums = dynamic(() => import('@/components/albums/FeaturedAlbums'), { ssr: false });

const Home = ({ genres, reviews, featuredAlbums }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

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
        <Modal onClose={handleClose}>
          <AlbumForm
            genres={genres}
            onClose={handleClose}
          />
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
