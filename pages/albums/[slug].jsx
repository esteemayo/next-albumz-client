import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { parseCookie } from '@/utils/index';
import * as albumAPI from '@/services/albumService';
import ClientOnly from '@/components/ClientOnly';

import styles from '@/styles/SingleAlbum.module.scss';

const Meta = dynamic(() => import('@/components/Meta'));
const ReviewForm = dynamic(() => import('@/components/form/ReviewForm'));
const Reviews = dynamic(() => import('@/components/review/Reviews'));
const RelatedAlbums = dynamic(() => import('@/components/albums/RelatedAlbums'));
const AlbumHero = dynamic(() => import('@/components/hero/AlbumHero'));
const AlbumDescription = dynamic(() => import ('@/components/albums/AlbumDescription'));

const SingleAlbum = ({ album, reviews }) => {
  const { user } = useSelector((state) => ({ ... state.auth }));

  const [singleAlbum, setSingleAlbum] = useState(album);
  const [rating, setRating] = useState(null);
  const [reviewList, setReviewList] = useState(reviews);
  const [review, setReview] = useState('');
  const [relatedAlbums, setRelatedAlbums] = useState([]);

  const updateReviewOrder = useCallback((reviews) => {
    setReviewList(reviews);
  }, []);

  const handleClear = useCallback(() => {
    setReview('');
    setRating(null);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const albumId = album.id;
    const newReview = {
      rating,
      review,
    };

    try {
      const { data } = await albumAPI.createReview(albumId, { ...newReview });

      const reviewData = { ...data.review, user: { ...user } };
      setReviewList((prev) => [reviewData, ...prev]);
      handleClear();
    } catch (err) {
      console.log(err);
      return toast.error(err.response.data.message);
    }
  }, [album.id, rating, review, user, handleClear]);

  const disableButton = useMemo(() => {
    const disabled = (!rating || !review);
    return !!disabled;
  }, [rating, review]);

  const relatedLabel = useMemo(() => {
    return relatedAlbums.length > 1 ?
      'Related Albums' :
      'Related Album';
  }, [relatedAlbums]);

  useEffect(() => {
    const tags = singleAlbum.tags;

    tags && (async () => {
      try {
        const { data } = await albumAPI.getRelatedAlbums(tags);
        setRelatedAlbums(data.albums);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [singleAlbum.tags]);

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
          rating={rating}
          review={review}
          disabled={disableButton}
          onRating={setRating}
          onReview={setReview}
          onSubmit={handleSubmit}
        />
        <Reviews
          reviews={reviewList}
          onSort={updateReviewOrder}
        />
        <RelatedAlbums
          albumId={singleAlbum.id}
          albums={relatedAlbums}
          relatedLabel={relatedLabel}
        />
      </section>
    </ClientOnly>
  );
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

SingleAlbum.propTypes = {
  album: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
};

export default SingleAlbum;
