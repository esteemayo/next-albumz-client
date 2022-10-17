import http from './httpService';

const apiEndpoint = '/albums';

const albumUrl = (albumId) => `${apiEndpoint}/${albumId}`;

export const getAlbums = (page) =>
  http.get(page ? `${apiEndpoint}?page=${page}` : apiEndpoint);

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

export const getAlbumsByTag = (tag) =>
  http.get(`${apiEndpoint}/tags/${tag}`);

export const getAlbumById = (albumId) => http.get(albumUrl(albumId));

export const getAlbumBySlug = (slug, token) =>
  http.get(`${apiEndpoint}/details/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getRelatedAlbums = (tags) =>
  http.post(`${apiEndpoint}/related-albums`, tags);

export const searchAlbums = (query) =>
  http.get(`${apiEndpoint}/search?q=${query}`);

export const createAlbum = (album) => http.post(apiEndpoint, album);

export const createReview = (albumId, review) =>
  http.post(`${apiEndpoint}/${albumId}/reviews`, review);

export const updateAlbum = (albumId, album) =>
  http.patch(albumUrl(albumId), album);

export const likeAlbum = (albumId) =>
  http.patch(`${apiEndpoint}/like-album/${albumId}`);

export const deleteAlbum = (albumId) => http.delete(albumUrl(albumId));
