import axios from 'axios';

import http from './httpService';
import { getFromStorage, tokenKey } from '@/utils/index';

const apiEndpoint = '/auth';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const nextLogin = (credentials) =>
  http.post(`${apiUrl}/auth/login`, credentials);

export const nextLogout = () => http.post(`${apiUrl}/auth/logout`);

export const getJwt = () => getFromStorage(tokenKey)?.token;
