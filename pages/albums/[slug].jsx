import dynamic from 'next/dynamic';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { parseCookie } from '@/utils/index';
import * as albumAPI from '@/services/albumservice';
import ClientOnly from '@/components/ClientOnly';

import styles from '@/styles/SingleAlbum.module.scss';

const Meta = dynamic(() => import('@/components/Meta'));
const ReviewForm = dynamic(() => import('@/components/review/ReviewForm'));
const Reviews = dynamic(() => import('@/components/review/Reviews'));
const SingleAlbumHero = dynamic(() => import('@/components/hero/SingleAlbumHero'));
const RelatedAlbums = dynamic(() => import('@/components/albums/RelatedAlbums'));
const AlbumDescription = dynamic(() => import ('@/components/albums/AlbumDescription'));

const SingleAlbum = ({ album, reviews }) => {
  const [singleAlbum, setSingleAlbum] = useState(album);
  const [reviewList, setReviewList] = useState(reviews);

  return (
    <ClientOnly>
      <Meta title={`${album.title} - Albumz Music Entertainment`} />
      <section className={styles.container}>
        <SingleAlbumHero album={singleAlbum} />
        <AlbumDescription album={singleAlbum} setSingleAlbum={setSingleAlbum} />
        <ReviewForm albumId={album.id} setReviewList={setReviewList} />
        <Reviews reviews={reviewList} />
        <RelatedAlbums albumId={album.id} tags={singleAlbum.tags} />
      </section>
    </ClientOnly>
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
  const { data: { reviews } } = await albumAPI.getReviewsOnAlbum(data?.album?._id, token);

  return {
    props: {
      reviews,
      album: data.album,
    },
  };
};

export default SingleAlbum;
