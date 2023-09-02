import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import AddButton from '@/components/button/AddButton';
import Modal from '@/components/modal/Modal';
import GenreModal from '@/components/modal/GenreModal';
import DialogBox from '@/components/modal/DialogBox';
import DeleteGenreModal from '@/components/modal/DeleteGenreModal';

import Meta from '@/components/Meta';
import DeleteAlbumGenre from '@/components/DeleteAlbumGenre';
import ClientOnly from '@/components/ClientOnly';

import { useDialogBox } from '@/hooks/useDialogBox';
import { useGenreModal } from '@/hooks/useGenreModal';

import { parseCookie } from '@/utils/index';
import { getGenres, deleteGenre } from '@/services/genreService';

import styles from '@/styles/Genres.module.scss';

const Genres = ({ genres }) => {
  const dialogBox = useDialogBox();
  const genreModal = useGenreModal();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [genreId, setGenreId] = useState(null);
  const [genreList, setGenreList] = useState(genres);

  const handleOpen = useCallback((genreId) => {
    dialogBox.onOpen();
    setGenreId(genreId);
  }, [dialogBox]);

  const handleDelete = useCallback(async (genreId) => {
    try {
      await deleteGenre(genreId);
      setGenreList((prev) => prev.filter((item) => item._id !== genreId));
      return toast.success('Genre deleted successfully');
    } catch (err) {
      console.log(err);
    }
  }, []);
  
  return (
    <ClientOnly>
      <Meta title='Genres - Albumz Music Entertainment' />
      {!!genres.length > 0 ? (
        <section className={styles.genres}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <TagOutlinedIcon className={styles.tableOrder} />
                </th>
                <th>Name</th>
                <th>Posted by</th>
                <th>Posted on</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {genreList?.map((item, index) => {
                const { _id: id, name, user, slug, createdAt } = item;
                return (
                  <tr key={id} className={styles.tr}>
                    <td>
                      <span className={styles.order}>{index + 1}</span>
                    </td>
                    <td>
                      <span className={styles.name}>{name}</span>
                    </td>
                    <td>
                      <span className={styles.postedBy}>{user?.name}</span>
                    </td>
                    <td>
                      <span className={styles.postedOn}>
                        <Moment fromNow>{createdAt}</Moment>
                      </span>
                    </td>
                    <td className={styles.buttonContainer}>
                      <Link href={`/genres/edit/${slug}`} passHref>
                        <a className={styles.btnUpdate}>Update</a>
                      </Link>
                      <button className={styles.btnDelete} onClick={() => handleOpen(id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <section className={styles.genres}>
          <h3 className={styles.notFound}>There are no genres available</h3>
        </section>
      )}
      {!!user && (
        <AddButton
          text='New genre'
          onClick={genreModal.onOpen}
        />
      )}
      <GenreModal
        isOpen={genreModal.isOpen}
        onClose={genreModal.onClose}
        onAction={setGenreList}
      />
      <DeleteGenreModal
        isOpen={dialogBox.isOpen}
        actionId={genreId}
        title='Discard genre?'
        onClose={dialogBox.onClose}
        onAction={handleDelete}
      />
    </ClientOnly>
  );
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
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

  const { data } = await getGenres(token);

  return {
    props: {
      genres: data.genres,
    },
  };
};

export default Genres;
