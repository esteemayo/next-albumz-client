import { useState } from 'react';

import Meta from '@/components/Meta';
import FormChipInput from '@/components/FormChipInput';
import styles from '@/styles/UpdateAlbum.module.scss';

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
                <div className={styles.form__group}>
                  <input
                    type='text'
                    placeholder='Artist'
                    className={styles.form__input}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    placeholder='Album Title'
                    className={styles.form__input}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.form__group}>
                  <select name='genre' onChange={handleChange} className={styles.form__select}>
                    <option defaultValue='Genre' disabled>Genre</option>
                    {genres.map((option) => {
                      return (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={styles.form__group}>
                  <textarea
                    name='info'
                    onChange={handleChange}
                    placeholder='Album Info'
                    className={styles.form__textarea}
                  ></textarea>
              </div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    name='year'
                    placeholder='Release Year'
                    className={styles.form__input}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    name='label'
                    placeholder='Record Label'
                    className={styles.form__input}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.form__group}>
                  <input
                    type='text'
                    name='tracks'
                    placeholder='Number of Tracks'
                    className={styles.form__input}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.form__group}>
                  <FormChipInput
                    name='tags'
                    value={tags}
                    placeholder='Tags'
                    onAdd={(tag) => handleAddTag(tag)}
                    onDelete={(tag) => handleDeleteTag(tag)}
                  />
              </div>
              <div className={styles.form__group}>
                <input
                  type='file'
                  className={styles.form__input}
                  onChange={(e) => setFile(e.target.files[0])}
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
