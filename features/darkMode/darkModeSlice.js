import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, setToStorage } from '@/utils/index';

const darkMode = getFromStorage('darkMode');

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
      setToStorage('darkMode', payload);
    },
    dark: (state, { payload }) => {
      state.darkMode = payload;
      setToStorage('darkMode', payload);
    },
  },
});

export const { dark, light, toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
