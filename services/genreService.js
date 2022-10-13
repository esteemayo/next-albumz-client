import http from './httpService';

const apiEndpoint = '/genres';

const genreUrl = (genreId) => `${apiEndpoint}/${genreId}`;

export const getGenres = (token) => http.get(apiEndpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllGenres = (token) => http.get(`${apiEndpoint}/all`);

export const getGenreById = (genreId) => http.get(genreUrl(genreId));

export const getGenreBySlug = (slug) => http.get(`${apiEndpoint}/show/${slug}`);

export const createGenre = (genre) => http.post(apiEndpoint, genre);

export const updateGenre = (genreId, genre) =>
  http.patch(genreUrl(genreId), genre);

export const deleteGenre = (genreId) => http.delete(genreUrl(genreId));
