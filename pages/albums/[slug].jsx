import Reviews from '@/components/Reviews';
import ReviewForm from '@/components/ReviewForm';
import RelatedAlbums from '@/components/RelatedAlbums';
import SingleAlbumHero from '@/components/SingleAlbumHero';
import AlbumDescription from '@/components/AlbumDescription';

import { parseCookie } from '@/utils/index';
import * as albumAPI from '@/services/albumservice';
import styles from '@/styles/SingleAlbum.module.scss';

const SingleAlbum = ({ album }) => {
  console.log(album)
  return (
    <section className={styles.container}>
      <SingleAlbumHero album={album} />
      <AlbumDescription album={album} />
      <ReviewForm />
      <Reviews album={album} />
      <RelatedAlbums />
    </section>
  );
};

// export const getStaticPaths = async () => {
//   const { data } = await albumAPI.getAlbums();

//   const paths = data.albums.map((item) => ({
//     params: { slug: item.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ req, params: { slug } }) => {
//   const { token } = parseCookie(req);

//   if (!token || token === '') {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       }
//     };
//   }

//   const { data } = await albumAPI.getAlbumBySlug(slug, token);

//   return {
//     props: {
//       album: data.album,
//     },
//     revalidate: 1,
//   };
// };

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
