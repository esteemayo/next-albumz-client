import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, setToStorage } from '@/utils/index';

const tokeyKey = 'darkMode';
const darkMode = getFromStorage(tokeyKey);

const initialState = {
  darkMode: darkMode ?? 'dark',
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    dark: (state, { payload }) => {
      state.darkMode = payload;
      setToStorage(tokeyKey, payload);
    },
    light: (state, { payload }) => {
      state.darkMode = payload;
      setToStorage(tokeyKey, payload);
    },
  },
});

export const { dark, light } = darkModeSlice.actions;

export default darkModeSlice.reducer;
