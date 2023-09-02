import Link from 'next/link';
import PropTypes from 'prop-types';

const MenuItem = ({
  url,
  icon: Icon,
  label,
  styles,
  ...rest
}) => {
  return (
    <li {...rest}>
      <Icon className={styles.itemIcon} />
      <Link href={url} passHref>
        <a className={styles.itemLink}>{label}</a>
      </Link>
    </li>
  );
};

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  rest: PropTypes.any,
};

export default MenuItem;
