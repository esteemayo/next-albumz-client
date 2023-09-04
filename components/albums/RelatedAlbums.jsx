import { useMemo } from 'react';
import PropTypes from 'prop-types';

import RelatedAlbumCard from '@/components/card/RelatedAlbumCard';

import styles from '@/styles/RelatedAlbums.module.scss';

const RelatedAlbums = ({ albumId, albums }) => {
  const relatedHeader = useMemo(() => {
    return albums.length > 1 ?
      'Related Albums' :
      'Related Album';
  }, [albums]);

  return (
    <>
      {!!albums && !!albums.length && (
        <section className={styles.related}>
          <div className={styles.related__wrapper}>
            <h6 className={styles.related__header}>{relatedHeader}</h6>
            <div className={styles.related__container}>
              {albums
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
