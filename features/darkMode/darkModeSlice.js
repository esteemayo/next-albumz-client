import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, setToStorage } from '@/utils/index';

const tokeyKey = 'darkMode';
const darkMode = getFromStorage(tokeyKey);

const initialState = {
  darkMode: darkMode ?? null,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle: (state) => {
      state.darkMode = !state.darkMode;
    },
    light: (state, { payload }) => {
      state.darkMode = payload;
      setToStorage(tokeyKey, payload);
    },
    dark: (state, { payload }) => {
      state.darkMode = payload;
      setToStorage(tokeyKey, payload);
    },
  },
});

export const { dark, light, toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
