import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { lazy, Suspense, useState } from 'react';

import { excerpts } from '@/utils/index';
import Spinner from '@/components/Spinner';
import DialogBox from '@/components/DialogBox';
import styles from '@/styles/DashboardCard.module.scss';
import DeleteAlbumGenre from '@/components/DeleteAlbumGenre';

const DashboardCard = ({ albums }) => {
  const [albumId, setAlbumId] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [albumList, setAlbumList] = useState(albums);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        {albumList?.map((item) => {
          const { _id: id, info, slug, image, title } = item;
          return (
            <div key={id} className={styles.wrapper}>
              <div className={styles.card}>
                <div className={styles.card__left}>
                  <div className={styles.card__img}>
                    <div className={styles.overlay}>&nbsp;</div>
                    <Image
                      src={image ? image : '/img/default-album-2.jpeg'}
                      width={200}
                      height={130}
                      alt={title}
                    />
                  </div>
                  <h3 className={styles.card__heading}>
                    <span>{title}</span>
                  </h3>
                </div>
                <div className={styles.card__right}>
                  <p className={styles.card__info}>{info && excerpts(info, 200)}</p>
                  <div className={styles.card__line}>&nbsp;</div>
                  <div className={styles.card__button}>
                    <Link href={`/albums/edit/${slug}`} passHref>
                      <a className={styles.card__updateBtn}>Update</a>
                    </Link>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setAlbumId(id);
                      }}
                      className={styles.card__delete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Suspense>
      {!showModal && (
        <DialogBox>
          <DeleteAlbumGenre
            type='album'
            albumId={albumId}
            title='Discard album?'
            closeModal={setShowModal}
            setAlbumList={setAlbumList}
          />
        </DialogBox>
      )}
    </>
  );
};

DashboardCard.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};

export default DashboardCard;
