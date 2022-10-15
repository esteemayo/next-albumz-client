import { useRouter } from 'next/router';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

import TagCard from '@/components/TagCard';
import styles from '@/styles/Tags.module.scss';
import { getAlbums, getAlbumsByTag } from '@/services/albumService';

const AlbumTags = ({ albums }) => {
  const { query } = useRouter();

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>
        <span className={styles.heading__main}>Album with tags:</span>
        <span className={styles.heading__sub}>
          <TagOutlinedIcon className={styles.tagIcon}/>{query.tag}
        </span>
      </h1>
      <TagCard />
      <TagCard />
      <TagCard />
    </section>
  );
};

export const getServerSideProps = async ({ params: { tag } }) => {
  const { data } = await getAlbumsByTag(tag);

  return {
    props: {
      albums: data.albums,
    },
  };
};

export default AlbumTags;
