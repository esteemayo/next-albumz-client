import Link from 'next/link';
import { useState } from 'react';
import Moment from 'react-moment';
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
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(true);
  
  return (
    <>
      <Meta title='Genres - Albumz Music Entertainment' />
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
            {genres?.map((item, index) => {
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
                      onClick={() => setShowModal(false)}
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
      <AddButton text='New genre' onClick={() => setOpen(true)} />
      {open && (
        <Modal onClose={setOpen}>
          <GenreForm type='genre' />
        </Modal>
      )}
      
      {!showModal && (
        <DialogBox>
          <DeleteAlbumGenre
            title='Discard genre?'
            closeModal={setShowModal}
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

export default Genres;
