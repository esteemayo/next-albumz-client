import PropTypes from 'prop-types';
import styles from '@/styles/AlbumDescription.module.scss';

const AlbumInfo = ({ icon, label, data }) => {
  return (
    <div className={styles.album__details}>
      <span>{icon}</span>
      <span>{label}</span>
      <span>{data}</span>
    </div>
  );
};

AlbumInfo.propTypes = {
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};

export default AlbumInfo;
