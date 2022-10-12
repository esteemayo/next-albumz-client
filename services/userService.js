import http from './httpService';

const apiEndpoint = '/users';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const register = (credentials) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const nextRegister = (credentials) =>
  http.post(`${apiUrl}/users/register`, credentials);

export const updateMe = (credentials) =>
  http.patch(`${apiEndpoint}/update-me`, credentials);

export const deleteMe = () => http.delete(`${apiEndpoint}/delete-me`);
