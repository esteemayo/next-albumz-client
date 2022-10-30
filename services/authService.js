import http from './httpService';
import { getFromStorage, tokenKey } from '@/utils/index';

const apiEndpoint = '/auth';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const nextLogin = (credentials) =>
  http.post(`${apiUrl}/auth/login`, credentials);

export const nextLogout = () => http.post(`${apiUrl}/auth/logout`);

export const forgot = (email) =>
  http.post(`${apiEndpoint}/forgot-password`, email);

export const reset = (token, credentials) =>
  http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const updatePassword = (credentials) =>
  http.patch(`${apiEndpoint}/update-my-password`, credentials);

export const getJwt = () => getFromStorage(tokenKey)?.token;
