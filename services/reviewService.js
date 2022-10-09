import http from './httpService';

const apiEndpoint = '/reviews';

export const getTopReviews = () => http.get(`${apiEndpoint}/top`);
