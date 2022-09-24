import { useState } from 'react';
import Rating from '@mui/material/Rating';

const StarRating = () => {
  const [rating, setRating] = useState(null);

  return (
    <Rating
      value={rating}
      precision={0.5}
      onChange={(e, newValue) => {
        setRating(newValue);
      }}
    />
  )
}

export default StarRating;
