import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, setToStorage } from '@/utils/index';

const tokeyKey = 'mode';
const mode = getFromStorage(tokeyKey);

const initialState = {
  mode: mode ?? 'dark',
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    dark: (state, { payload }) => {
      state.mode = payload;
      setToStorage(tokeyKey, payload);
    },
    light: (state, { payload }) => {
      state.mode = payload;
      setToStorage(tokeyKey, payload);
    },
  },
});

export const { dark, light } = darkModeSlice.actions;

export default darkModeSlice.reducer;
