import { useState } from 'react';
import PropTypes from 'prop-types';

import Meta from '@/components/Meta';
import Reviews from '@/components/Reviews';
import { parseCookie } from '@/utils/index';
import ReviewForm from '@/components/ReviewForm';
import * as albumAPI from '@/services/albumservice';
import styles from '@/styles/SingleAlbum.module.scss';
import RelatedAlbums from '@/components/RelatedAlbums';
import SingleAlbumHero from '@/components/SingleAlbumHero';
import AlbumDescription from '@/components/AlbumDescription';

const SingleAlbum = ({ album }) => {
  const [singleAlbum, setSingleAlbum] = useState(album);
  const [reviews, setReviews] = useState(album.reviews);

  return (
    <>
      <Meta title={`${album.title} - Albumz Music Entertainment`} />
      <section className={styles.container}>
        <SingleAlbumHero album={singleAlbum} />
        <AlbumDescription album={singleAlbum} setSingleAlbum={setSingleAlbum} />
        <ReviewForm albumId={album.id} setReviews={setReviews} />
        <Reviews reviews={reviews} />
        <RelatedAlbums albumId={album.id} tags={album.tags} />
      </section>
    </>
  );
};

SingleAlbum.propTypes = {
  album: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    tracks: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    ratingsQuantity: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    featured: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    likes: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

export const getServerSideProps = async ({ req, params: { slug } }) => {
  const { token } = parseCookie(req);

  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    };
  }

  const { data } = await albumAPI.getAlbumBySlug(slug, token);

  return {
    props: {
      album: data.album,
    },
  };
};

export default SingleAlbum;
