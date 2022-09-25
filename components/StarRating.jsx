import Rating from '@mui/material/Rating';

const StarRating = ({ value, ...rest }) => {
  return (
    <Rating
      {...rest}
      readOnly
      value={value}
      precision={0.5}
      size='large'
      name='read-only'
    />
  );
};

export default StarRating;
