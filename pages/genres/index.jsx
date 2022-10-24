import Link from 'next/link';
import { useState } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

import Meta from '@/components/Meta';
import Modal from '@/components/Modal';
import { parseCookie } from '@/utils/index';
import AddButton from '@/components/AddButton';
import DialogBox from '@/components/DialogBox';
import GenreForm from '@/components/GenreForm';
import styles from '@/styles/Genres.module.scss';
import { getGenres } from '@/services/genreService';
import DeleteAlbumGenre from '@/components/DeleteAlbumGenre';

const Genres = ({ genres }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [open, setOpen] = useState(false);
  const [genreId, setGenreId] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [genreList, setGenreList] = useState(genres);
  
  return (
    <>
      <Meta title='Genres - Albumz Music Entertainment' />
      {genres.length > 0 ? (
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
                      <button
                        className={styles.btnDelete}
                        onClick={() => {
                          setShowModal(false);
                          setGenreId(id);
                        }}
                      >
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
      {user && <AddButton text='New genre' onClick={() => setOpen(true)} />}
      {open && (
        <Modal onClose={setOpen}>
          <GenreForm
            type='genre'
            onClose={setOpen}
            setGenreList={setGenreList}
          />
        </Modal>
      )}
      
      {!showModal && (
        <DialogBox>
          <DeleteAlbumGenre
            type='genre'
            genreId={genreId}
            title='Discard genre?'
            closeModal={setShowModal}
            setGenreList={setGenreList}
          />
        </DialogBox>
      )}
    </>
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

  const { data } = await getGenres(token);

  return {
    props: {
      genres: data.genres,
    },
  };
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

export default Genres;
