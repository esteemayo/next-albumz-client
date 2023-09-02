import Image from 'next/image';
import PropTypes from 'prop-types';

const Avatar = ({ src, styles, alt }) => {
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
  src: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Avatar;
