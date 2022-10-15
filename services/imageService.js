import axios from 'axios';

export const uploadImage = (image) =>
  axios.post(
    'https://api.cloudinary.com/v1_1/learnhowtocode/image/upload',
    image
  );
