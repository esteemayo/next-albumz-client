import Link from 'next/link';
import { useState } from 'react';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

import Meta from '@/components/Meta';
import Modal from '@/components/Modal';
import AddButton from '@/components/AddButton';
import DialogBox from '@/components/DialogBox';
import GenreForm from '@/components/GenreForm';
import styles from '@/styles/Genres.module.scss';
import DeleteAlbumGenre from '@/components/DeleteAlbumGenre';

const Genres = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(true)
  
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
            <tr>
              <td>1</td>
              <td>Afro pop</td>
              <td>John doe</td>
              <td>{new Date().toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric'})}</td>
              <td className={styles.buttonContainer}>
                <Link href={`/genres/edit/slug`} passHref>
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
            <tr>
              <td>2</td>
              <td>Afro pop</td>
              <td>John doe</td>
              <td>{new Date().toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric'})}</td>
              <td className={styles.buttonContainer}>
                <Link href={`/genres/edit/slug`} passHref>
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
            <tr>
              <td>3</td>
              <td>Afro pop</td>
              <td>John doe</td>
              <td>{new Date().toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric'})}</td>
              <td className={styles.buttonContainer}>
                <Link href={`/genres/edit/slug`} passHref>
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

export default Genres;
