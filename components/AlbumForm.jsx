import { useState } from 'react';
import { toast } from 'react-toastify';

import FormInput from './FormInput';
import FormButton from './FormButton';
import FormTextArea from './FormTextArea';
import FormChipInput from './FormChipInput';
import styles from '@/styles/Form.module.scss';
import FormSelectInput from './FormSelectInput';
import { createAlbum } from '@/services/albumService';

const initialState = {
  artist: '',
  title: '',
  genre: '',
  info: '',
  year: '',
  label: '',
  tracks: '',
  tags: [],
};

const AlbumForm = ({ genres, onClose, setAlbumList }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const { tags } = formData;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (tag) => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const handleDeleteTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== tag)
    }));
  };

  const emptyFieldCheck = Object.values(formData).some((item) => item === '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const newAlbum = {
      ...formData,
      tracks: +formData.tracks,
    };
    
    try {
      const { data } = await createAlbum({ ...newAlbum });
      setAlbumList && setAlbumList((prev) => [data.genre, ...prev]);
      onClose(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Add Album</h1>
        </header>
        <div className={styles.form__container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form__wrapper}>
              <div className={styles.form__headline}>Create New Album</div>
              <FormInput
                name='artist'
                placeholder='Artist'
                onChange={handleChange}
              />
              <FormInput
                name='title'
                onChange={handleChange}
                placeholder='Album Title'
              />
              <FormSelectInput
                name='genre'
                text='Genre'
                options={genres}
                onChange={handleChange}
              />
              <FormTextArea
                name='info'
                onChange={handleChange}
                placeholder='Album Info'
              />
              <FormInput
                name='year'
                placeholder='Release Year'
                onChange={handleChange}
              />
              <FormInput
                name='label'
                placeholder='Record Label'
                onChange={handleChange}
              />
              <FormInput
                name='tracks'
                placeholder='Number of Tracks'
                onChange={handleChange}
              />
              <FormChipInput
                name='tags'
                value={tags}
                placeholder='Tags'
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              <FormInput
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <FormButton text='Submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;
