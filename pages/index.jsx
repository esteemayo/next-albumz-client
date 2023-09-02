import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AddButton from '@/components/button/AddButton';
import AlbumForm from '@/components/form/AlbumForm';
import AlbumModal from '@/components/modal/AlbumModal';
import Hero from '@/components/hero/Hero';

import ClientOnly from '@/components/ClientOnly';
import { useAlbumModal } from '@/hooks/useAlbumModal';

import { getTopReviews } from '@/services/reviewService';
import { getAllGenres } from '@/services/genreService';
import { getFeaturedAlbums } from '@/services/albumService';

const TopReviews = dynamic(() => import('@/components/review/TopReviews'), { ssr: false });
const FeaturedAlbums = dynamic(() => import('@/components/albums/FeaturedAlbums'), { ssr: false });

const Home = ({ genres, reviews, featuredAlbums }) => {
  const { isOpen, onOpen, onClose } = useAlbumModal();
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <ClientOnly>
      <Hero />
      <FeaturedAlbums albums={featuredAlbums} />
      <TopReviews reviews={reviews} />
      {!!user && (
        <AddButton
          text='New album'
          onClick={onOpen}
        />
      )}
      <AlbumModal
        genres={genres}
        isOpen={isOpen}
        onClose={onClose}
      />
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
