import { useEffect, useState } from 'react';

import RelatedAlbumCard from './RelatedAlbumCard';
import styles from '@/styles/RelatedAlbums.module.scss';
import { getRelatedAlbums } from '@/services/albumService';

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
      {relatedAlbums && relatedAlbums.length && (
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

export default RelatedAlbums;
