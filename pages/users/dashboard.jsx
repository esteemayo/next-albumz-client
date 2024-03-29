import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import AddButton from '@/components/button/AddButton';
import DeleteAlbumGenreModal from '@/components/modal/DeleteAlbumGenreModal';
import AlbumModal from '@/components/modal/AlbumModal';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';

import { useDialogBox } from '@/hooks/useDialogBox';
import { useAlbumModal } from '@/hooks/useAlbumModal';

import { getAllGenres } from '@/services/genreService';
import { deleteAlbum, getUserAlbums } from '@/services/albumService';

import { parseCookie } from '@/utils/index';

import styles from '@/styles/Dashboard.module.scss';

const DashboardCard = dynamic(() => import('@/components/card/DashboardCard'), { ssr: false });

const Dashboard = ({ albums, genres }) => {
  const dialogBox = useDialogBox();
  const albumModal = useAlbumModal();

  const [albumId, setAlbumId] = useState(null);
  const [albumList, setAlbumList] = useState(albums);

  const handleOpen = useCallback((albumId) => {
    dialogBox.onOpen();
    setAlbumId(albumId);
  }, [dialogBox]);

  const handleDelete = useCallback(async (albumId) => {
    try {
      await deleteAlbum(albumId);
      setAlbumList((prev) => prev.filter((item) => item._id !== albumId));
      return toast.success('Album deleted successfully');
    } catch (err) {
      console.log(err);
    }
  }, []);
  
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
            onOpen={handleOpen}
          />
        )}
      </section>
      <AddButton
        text='New album'
        onClick={albumModal.onOpen}
      />
      <AlbumModal
        genres={genres}
        isOpen={albumModal.isOpen}
        onClose={albumModal.onClose}
      />
      <DeleteAlbumGenreModal
        isOpen={dialogBox.isOpen}
        actionId={albumId}
        title='Discard album?'
        onClose={dialogBox.onClose}
        onAction={handleDelete}
      />
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
