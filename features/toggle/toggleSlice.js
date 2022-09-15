import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleMenu: false,
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggleMenu: (state) => {
      state.toggleMenu = !state.toggleMenu;
    },
  },
});

export const { setToggleMenu } = toggleSlice.actions;

export default toggleSlice.reducer;
