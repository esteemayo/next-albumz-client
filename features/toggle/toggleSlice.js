import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false,
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { closeMenu, toggleMenu } = toggleSlice.actions;

export default toggleSlice.reducer;
