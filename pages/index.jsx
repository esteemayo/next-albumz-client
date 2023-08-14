import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import AddButton from '@/components/button/AddButton';
import Modal from '@/components/modal/Modal';
import AlbumForm from '@/components/form/AlbumForm';
import Hero from '@/components/hero/Hero';

import ClientOnly from '@/components/ClientOnly';

import { getTopReviews } from '@/services/reviewService';
import { getAllGenres } from '@/services/genreService';
import { getFeaturedAlbums } from '@/services/albumService';

const TopReviews = dynamic(() => import('@/components/review/TopReviews'), { ssr: false });
const FeaturedAlbums = dynamic(() => import('@/components/albums/FeaturedAlbums'), { ssr: false });

const Home = ({ genres, reviews, featuredAlbums }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [showModal, setShowModal] = useState(false);

  const handleOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <ClientOnly>
      <Hero />
      <FeaturedAlbums albums={featuredAlbums} />
      <TopReviews reviews={reviews} />
      {!!user && (
        <AddButton
          text='New album'
          onClick={handleOpen}
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

Home.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      album: PropTypes.object.isRequired,
    }),
  ),
  featuredAlbums: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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

export default Home;
