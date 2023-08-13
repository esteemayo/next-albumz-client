import { lazy, Suspense } from 'react';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Spinner from '@/components/Spinner';
import ClientOnly from '@/components/ClientOnly';

import { getAlbumsByTag } from '@/services/albumService';

import styles from '@/styles/Tags.module.scss';

const TagCard = lazy(() => import('@/components/card/TagCard'));

const AlbumTags = ({ albums }) => {
  const { query } = useRouter();

  return (
    <ClientOnly>
      <section className={styles.container}>
        <h1 className={styles.heading}>
          <span className={styles.heading__main}>Album with tags:</span>
          <span className={styles.heading__sub}>
            <TagOutlinedIcon className={styles.tagIcon}/>{query.tag}
          </span>
        </h1>
        <Suspense fallback={<Spinner />}>
          {albums?.map((item) => {
            return <TagCard key={item._id} album={item} />;
          })}
        </Suspense>
      </section>
    </ClientOnly>
  );
};

export const getServerSideProps = async ({ params: { tag } }) => {
  const { data } = await getAlbumsByTag(tag);

  return {
    props: {
      albums: data.albums,
    },
  };
};

AlbumTags.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      info: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default AlbumTags;
