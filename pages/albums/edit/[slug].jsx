import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Meta from '@/components/Meta';
import { parseCookie } from '@/utils/index';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import { uploadImage } from '@/services/imageService';
import styles from '@/styles/UpdateAlbum.module.scss';
import FormChipInput from '@/components/FormChipInput';
import { getAllGenres } from '@/services/genreService';
import FormSelectInput from '@/components/FormSelectInput';
import { getAlbumBySlug, updateAlbum } from '@/services/albumService';

const UpdateAlbum = ({ album, genres }) => {
  const [file, setFile] = useState(null);
  const [artist, setArtist] = useState(album?.artist);
  const [title, setTitle] = useState(album?.title);
  const [genre, setGenre] = useState(album?.genre);
  const [info, setInfo] = useState(album?.info);
  const [year, setYear] = useState(album?.year);
  const [label, setLabel] = useState(album?.label);
  const [tracks, setTracks] = useState(album?.tracks);
  const [formData, setFormData] = useState({
    tags: album?.tags,
  });

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { tags } = formData;

  const handleAddTag = (tag) => {
    setFormData((prev) => ({ ...prev,tags: [ ...prev.tags, tag] }));
  };

  const handleDeleteTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }));
  };

  const validateForm = () => {
    if (!artist || !title || !genre || !info || !year || !label || !tracks) {
      return toast.error('Please fill all input field');
    }

    if (!tags.length) {
      return toast.error('Please provide some tags');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'albumz/album');

    try {
      const albumId = album?._id;
      const updatedAlbum = {
        artist,
        title,
        genre,
        info,
        year,
        label,
        tracks,
        tags,
      };

      if (file) {
        const res = await uploadImage(form);
        const { url } = res.data;
        updatedAlbum.image = url;
      }

      const { data } = await updateAlbum(albumId, { ...updatedAlbum });
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <>
      <Meta title='Update album - Albumz Music Entertainment' />
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>Update</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper}>
                <div className={styles.form__headline}>Update Album</div>
                <FormInput
                  placeholder='Artist'
                  value={artist || ''}
                  onChange={(e) => setArtist(e.target.value)}
                />
                <FormInput
                  placeholder='Album Title'
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormSelectInput
                  name='genre'
                  text='Genre'
                  value={genre}
                  options={genres}
                  onChange={(e) => setGenre(e.target.value)}
                />
                <FormTextArea
                  name='info'
                  value={info || ''}
                  placeholder='Album Info'
                  onChange={(e) => setInfo(e.target.value)}
                />
                <FormInput
                  name='year'
                  value={year || ''}
                  placeholder='Release Year'
                  onChange={(e) => setYear(e.target.value)}
                />
                <FormInput
                  name='label'
                  placeholder='Record Label'
                  onChange={(e) => setLabel(e.target.value)}
                />
                <FormInput
                  name='tracks'
                  value={tracks || ''}
                  placeholder='Number of Tracks'
                  onChange={(e) => setTracks(e.target.value)}
                />
                <FormChipInput
                  name='tags'
                  value={tags || []}
                  placeholder='Tags'
                  onAdd={(tag) => handleAddTag(tag)}
                  onDelete={(tag) => handleDeleteTag(tag)}
                />
                <FormInput
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className={styles.form__image}>
                  <Image
                    src='/img/banner.jpg'
                    width={180}
                    height={100}
                    objectFit='cover'
                    alt=''
                  />
                </div>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async ({ req, params: { slug } }) => {
  const { token } = parseCookie(req);

  if (!token || token === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const { data } = await getAllGenres();
  const { data: { album } } = await getAlbumBySlug(slug, token);

  return {
    props: {
      album,
      genres: data.genres,
    },
  };
};

export default UpdateAlbum;
