import Image from 'next/image';
import Link from 'next/link';
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import DialogBox from '@/components/DialogBox';
import Spinner from '@/components/Spinner';
import DeleteAlbumGenre from '@/components/DeleteAlbumGenre';

import { excerpts } from '@/utils/index';

import styles from '@/styles/DashboardCard.module.scss';

const DashboardCard = ({
  isOpen,
  albums,
  actionId,
  onOpen,
  onClose,
  onDelete,
 }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        {albums?.map((item) => {
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
                      alt=''
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
                    <button onClick={() => onOpen(id)} className={styles.card__delete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Suspense>
      {!isOpen && (
        <DialogBox>
          <DeleteAlbumGenre
            type='album'
            actionId={actionId}
            title='Discard album?'
            onClose={onClose}
            onAction={onDelete}
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
