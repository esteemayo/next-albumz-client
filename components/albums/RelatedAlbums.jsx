import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import RelatedAlbumCard from './RelatedAlbumCard';
import { getRelatedAlbums } from '@/services/albumService';

import styles from '@/styles/RelatedAlbums.module.scss';

const RelatedAlbums = ({ albumId, tags }) => {
  const [relatedAlbums, setRelatedAlbums] = useState([]);
  
  useEffect(() => {
    tags && (async () => {
      try {
        const { data } = await getRelatedAlbums(tags);
        setRelatedAlbums(data.albums);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [tags]);

  return (
    <>
      {!!relatedAlbums && !!relatedAlbums.length && (
        <section className={styles.related}>
          <div className={styles.related__wrapper}>
            <h6 className={styles.related__header}>{relatedAlbums.length > 1 ? 'Related Albums' : 'Related Album'}</h6>
            <div className={styles.related__container}>
              {relatedAlbums
                .filter((item) => item._id !== albumId)
                .slice(0, 3)
                .map((item) => {
                  return <RelatedAlbumCard key={item._id} {...item} />;
                })
              }
            </div>
          </div>
        </section>
      )}
    </>
  );
};

RelatedAlbums.propTypes = {
  albumId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
};

export default RelatedAlbums;
