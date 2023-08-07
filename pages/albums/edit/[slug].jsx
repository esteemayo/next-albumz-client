import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Meta from '@/components/Meta';
import ClientOnly from '@/components/ClientOnly';
import FormInput from '@/components/FormInput';
import FormChipInput from '@/components/FormChipInput';
import FormTextArea from '@/components/FormTextArea';
import FormSelectInput from '@/components/FormSelectInput';

import { parseCookie } from '@/utils/index';
import { uploadImage } from '@/services/imageService';
import styles from '@/styles/UpdateAlbum.module.scss';
import { getAllGenres } from '@/services/genreService';
import { getAlbumBySlug, updateAlbum } from '@/services/albumService';

const UpdateAlbum = ({ album, genres }) => {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [artist, setArtist] = useState(album?.artist);
  const [title, setTitle] = useState(album?.title);
  const [genre, setGenre] = useState(album?.genre);
  const [info, setInfo] = useState(album?.info);
  const [year, setYear] = useState(album?.year);
  const [label, setLabel] = useState(album?.label);
  const [tracks, setTracks] = useState(album?.tracks);
  const [imagePreview, setImagePreview] = useState(album?.image ?? null);
  const [formData, setFormData] = useState({
    tags: album?.tags,
  });

  const { tags } = formData;

  const handleAddTag = (tag) => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const handleDeleteTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artist || !title || !genre || !info || !year || !label || !tracks) {
      return toast.error('Please fill all input field');
    }

    if (!tags.length) {
      return toast.error('Please provide some tags');
    }

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'albumz');

    try {
      const albumId = album?._id;
      const updAlbum = {
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
        updAlbum.image = url;
      }

      const { data } = await updateAlbum(albumId, updAlbum);
      setImagePreview(data.album.image);
      router.push(`/albums/${data.album.slug}`);
      return toast.success('Update successful');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ClientOnly>
      <Meta title={`Update ${album?.title} - Albumz Music Entertainment`} />
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
                  {imagePreview || file ? (
                    <Image
                      src={file ? URL.createObjectURL(file) : imagePreview}
                      width={180}
                      height={100}
                      objectFit='cover'
                      alt=''
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className={styles.form__btnWrapper}>
                  <button type='submit' className={styles.form__btn}>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ClientOnly>
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
