import { createSlice } from '@reduxjs/toolkit';
import { darkModeKey, getFromStorage, setToStorage } from '@/utils/index';

const mode = getFromStorage(darkModeKey);

const initialState = {
  mode: mode ?? 'dark',
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    dark: (state, { payload }) => {
      state.mode = payload;
      setToStorage(darkModeKey, payload);
    },
    light: (state, { payload }) => {
      state.mode = payload;
      setToStorage(darkModeKey, payload);
    },
  },
});

export const { dark, light } = darkModeSlice.actions;

export default darkModeSlice.reducer;
