import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import DialogBox from '@/components/DialogBox';
import DeleteAlbum from '@/components/DeleteAlbum';
import styles from '@/styles/DashboardCard.module.scss';

const DashboardCard = ({ openModal }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.card__left}>
            <div className={styles.card__img}>
              <div className={styles.overlay}>&nbsp;</div>
              <Image
                src='/img/banner.jpg'
                width={200}
                height={130}
                alt=''
              />
            </div>
            <h3 className={styles.card__heading}>
              <span>Made in lagos</span>
            </h3>
          </div>
          <div className={styles.card__right}>
            <p className={styles.card__info}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita 
              nisi molestias porro, itaque harum quas provident suscipit error doloribus 
              neque nulla. Est quia laudantium quo velit, atque placeat voluptate!
            </p>
            <div className={styles.card__line}>&nbsp;</div>
            <div className={styles.card__button}>
              <Link href={`/albums/edit/slug`} passHref>
                <a className={styles.card__updateBtn}>Update</a>
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className={styles.card__delete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {!showModal && (
        <DialogBox>
          <DeleteAlbum closeModal={setShowModal} />
        </DialogBox>
      )}
    </>
  );
};

export default DashboardCard;
