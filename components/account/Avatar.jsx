import Image from 'next/image';
import PropTypes from 'prop-types';

const Avatar = ({ src, styles, username }) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        width={80}
        height={80}
        objectFit='cover'
        alt={username}
      />
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default Avatar;
