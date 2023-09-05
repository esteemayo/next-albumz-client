import Rating from '@mui/material/Rating';

const StarRating = ({ value, ...rest }) => {
  return (
    <Rating
      {...rest}
      value={value}
      precision={0.5}
      size='large'
    />
  );
};

export default StarRating;
