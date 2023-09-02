import Image from 'next/image';
import PropTypes from 'prop-types';

const Avatar = ({ alt, src, styles }) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        width={80}
        height={80}
        objectFit='cover'
        alt={alt}
      />
    </div>
  );
};

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

export default Avatar;
