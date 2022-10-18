import http from './httpService';

const apiEndpoint = '/histories';

export const getViewsOnAlbum = (albumId) =>
  http.get(`${apiEndpoint}/album/${albumId}`);

export const createView = (album) => http.post(apiEndpoint, album);
