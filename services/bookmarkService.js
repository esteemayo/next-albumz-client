import http from './httpService';

const apiEndpoint = '/bookmarks';

const bookmarkUrl = (bookmarkId) => `${apiEndpoint}/${bookmarkId}`;

export const getBookmark = async (albumId) =>
  http.get(`${apiEndpoint}/album/${albumId}`);

export const createBookmark = async (album) => http.post(apiEndpoint, album);

export const deleteBookmark = async (bookmarkId) =>
  http.delete(bookmarkUrl(bookmarkId));
  