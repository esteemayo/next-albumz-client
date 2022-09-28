import Image from 'next/image';
import { useState } from 'react';

import Meta from '@/components/Meta';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import FormSelectInput from '@/components/FormSelectInput';
import styles from '@/styles/UpdateAlbum.module.scss';
import FormChipInput from '@/components/FormChipInput';

const UpdateAlbum = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    artist: '',
    title: '',
    genre: '',
    info: '',
    year: '',
    label: '',
    tracks: '',
    tags: [],
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

  const genres = [
    { id: 1, name: 'Afro Pop'},
    { id: 2, name: 'Afro Fusion'},
    { id: 3, name: 'Pop'},
    { id: 4, name: 'Blues'},
    { id: 5, name: 'Rock'},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  onChange={handleChange}
                />
                <FormInput
                  placeholder='Album Title'
                  onChange={handleChange}
                />
                <FormSelectInput
                  name='genre'
                  onChange={handleChange}
                  text='Genre'
                  options={genres}
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

export default UpdateAlbum;
