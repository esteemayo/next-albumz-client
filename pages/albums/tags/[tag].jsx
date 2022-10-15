import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

import TagCard from '@/components/TagCard';
import styles from '@/styles/Tags.module.scss';

const AlbumTags = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>
        <span className={styles.heading__main}>Album with tags:</span>
        <span className={styles.heading__sub}>
          <TagOutlinedIcon className={styles.tagIcon}/>hottest
        </span>
      </h1>
      <TagCard />
      <TagCard />
      <TagCard />
    </section>
  );
};

export default AlbumTags;
