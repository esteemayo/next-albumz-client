import cookie from 'cookie';

export const tokenKey = 'token';

export const darkModeKey = 'mode';

export const excerpts = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...';
  }
  return str;
};

export const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key));
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
};

export const parseCookie = (req) =>
  cookie.parse(req ? req.headers.cookie || '' : '');
