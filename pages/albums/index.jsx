import { useState } from 'react';

import Modal from '@/components/Modal';
import AddButton from '@/components/AddButton';
import AlbumCard from '@/components/AlbumCard';
import AlbumForm from '@/components/AlbumForm';
import styles from '@/styles/Albums.module.scss';

const Albums = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </div>
      <AddButton text='New album' onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={setShowModal}>
          <AlbumForm />
        </Modal>
      )}
    </main>
  );
};

export default Albums;
