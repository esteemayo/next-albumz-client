import PropTypes from 'prop-types';

const AccountHeading = ({ styles, title }) => {
  return (
    <h1 className={styles.account__heading}>
      {title}
    </h1>
  );
};

AccountHeading.propTypes = {
  styles: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default AccountHeading;
