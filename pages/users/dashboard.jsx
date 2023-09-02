import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Modal from '@/components/modal/Modal';
import DialogBox from '@/components/modal/DialogBox';

import AlbumForm from '@/components/form/AlbumForm';
import AddButton from '@/components/button/AddButton';
import AlbumModal from '@/components/modal/AlbumModal';

import Meta from '@/components/Meta';
import DeleteAlbumGenre from '@/components/DeleteAlbumGenre';
import ClientOnly from '@/components/ClientOnly';

import { getAllGenres } from '@/services/genreService';
import { deleteAlbum, getUserAlbums } from '@/services/albumService';

import { parseCookie } from '@/utils/index';
import { useAlbumModal } from '@/hooks/useAlbumModal';

import styles from '@/styles/Dashboard.module.scss';

const DashboardCard = dynamic(() => import('@/components/card/DashboardCard'), { ssr: false });

const Dashboard = ({ albums, genres }) => {
  const [albumList, setAlbumList] = useState(albums);
  const [albumId, setAlbumId] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleOpenModal = useCallback((albumId) => {
    setShowModal(false);
    setAlbumId(albumId);
  }, []);

  const handleCloseModal = useCallback((albumId) => {
    setShowModal(true);
  }, []);

  const handleDelete = useCallback(async (albumId) => {
    try {
      await deleteAlbum(albumId);
      setAlbumList((prev) => prev.filter((item) => item._id !== albumId));
      return toast.success('Album deleted successfully');
    } catch (err) {
      console.log(err);
    }
  }, [albumId]);
  
  return (
    <ClientOnly>
      <Meta title='User Dashboard - Albumz Music Entertainment' />
      <section className={styles.container}>
        <h1 className={styles.header}>Dashboard</h1>
        {albumList.length === 0 ? (
          <h2>There are no albums in the database</h2>
        ): (
          <DashboardCard
            albums={albumList}
            onOpen={handleOpenModal}
          />
        )}
      </section>
      <AddButton
        text='New album'
        onClick={handleOpen}
      />
      {!isOpen && (
        <Modal onClose={handleClose}>
          <AlbumForm
            genres={genres}
            onClose={handleClose}
          />
        </Modal>
      )}
      {!showModal && (
        <DialogBox>
          <DeleteAlbumGenre
            actionId={albumId}
            title='Discard album?'
            onClose={handleCloseModal}
            onAction={handleDelete}
          />
        </DialogBox>
      )}
    </ClientOnly>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);
  
  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  
  const { data } = await getUserAlbums(token);
  const { data: { genres } } = await getAllGenres();

  return {
    props: {
      albums: data.albums,
      genres,
    },
  };
};

Dashboard.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default Dashboard;
