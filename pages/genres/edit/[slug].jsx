import { toast } from 'react-toastify';
import { useState } from 'react';
import { useRouter } from 'next/router';

import ClientOnly from '@/components/ClientOnly';
import Meta from '@/components/Meta';
import FormButton from '@/components/FormButton';
import FormInput from '@/components/FormInput';

import { parseCookie } from '@/utils/index';
import { getGenreBySlug, updateGenre } from '@/services/genreService';

import styles from '@/styles/UpdateGenre.module.scss';

const UpdateGenre = ({ genre }) => {
  const { push } = useRouter();
  const [name, setName] = useState(genre?.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      return toast.error('Please provide a name');
    }

    await handleUpdate();
    await push('/genres');
  };
  
  const handleUpdate = async () => {
    try {
      const genreId = genre?._id;
      const updGenre = { name };
  
      await updateGenre(genreId, updGenre);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ClientOnly>
      <Meta title={`${genre?.name} - Albumz Music Entertainment`} />
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1>Genre</h1>
          </header>
          <div className={styles.form__container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__wrapper} style={{ height: '25rem' }}>
                <div className={styles.form__headline}>Update Genre</div>
                <FormInput
                  placeholder='Name'
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormButton text='Update' />
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

  const { data } = await getGenreBySlug(slug, token);

  return {
    props: {
      genre: data.genre,
    },
  };
};

export default UpdateGenre;
