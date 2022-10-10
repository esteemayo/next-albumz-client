import http from './httpService';

const apiEndpoint = '/albums';

const albumUrl = (albumId) => `${apiEndpoint}/${albumId}`;

export const getAlbums = () => http.get(apiEndpoint);

export const getFeaturedAlbums = () => http.get(`${apiEndpoint}/featured`);

export const getUserAlbums = (token) =>
  http.get(`${apiEndpoint}/user-albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTopAlbums = (token) => 
  http.get(`${apiEndpoint}/top`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAlbumsByTag = (tag) => http.get(`${apiEndpoint}/tags/${tag}`);

export const getAlbumById = (albumId) => http.get(albumUrl(albumId));

export const getAlbumBySlug = (slug) => http.get(`${apiEndpoint}/details/${slug}`);

export const createAlbum = (album) => http.post(apiEndpoint, album);

export const createReview = (albumId, review) => http.post(`${apiEndpoint}/${albumId}/reviews`);

export const updateAlbum = (albumId, album) => http.patch(albumUrl(albumId), album);

export const likeAlbum = (albumId) => http.patch(`${apiEndpoint}/like-album/${albumId}`);

export const deleteAlbum = (albumId) => http.delete(albumUrl(albumId));
