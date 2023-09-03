import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { parseCookie } from '@/utils/index';
import * as albumAPI from '@/services/albumservice';
import ClientOnly from '@/components/ClientOnly';

import styles from '@/styles/SingleAlbum.module.scss';

const Meta = dynamic(() => import('@/components/Meta'));
const ReviewForm = dynamic(() => import('@/components/form/ReviewForm'));
const Reviews = dynamic(() => import('@/components/review/Reviews'));
const RelatedAlbums = dynamic(() => import('@/components/albums/RelatedAlbums'));
const AlbumHero = dynamic(() => import('@/components/hero/AlbumHero'));
const AlbumDescription = dynamic(() => import ('@/components/albums/AlbumDescription'));

const SingleAlbum = ({ album, reviews }) => {
  const [reviewList, setReviewList] = useState([]);
  const [singleAlbum, setSingleAlbum] = useState(album);

  const updateReviewOrder = useCallback((reviews) => {
    setReviewList(reviews);
  }, []);

  useEffect(() => {
    setReviewList(reviews);
  }, []);

  return (
    <ClientOnly>
      <Meta title={`${album.title} - Albumz Music Entertainment`} />
      <section className={styles.container}>
        <AlbumHero album={singleAlbum} />
        <AlbumDescription
          album={singleAlbum}
          setSingleAlbum={setSingleAlbum}
        />
        <ReviewForm
          albumId={album.id}
          setReviewList={setReviewList}
        />
        <Reviews
          reviews={reviewList}
          onSort={updateReviewOrder}
        />
        <RelatedAlbums
          albumId={album.id}
          tags={singleAlbum.tags}
        />
      </section>
    </ClientOnly>
  );
};

SingleAlbum.propTypes = {
  album: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
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
