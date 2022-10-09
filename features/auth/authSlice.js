import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFromStorage, removeFromStorage, setToStorage } from '@/utils/index';

import { login } from '@/services/authService';
import { register } from '@/services/userService';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout: (state) => {},
  },
  extraReducers: (builder) => {},
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
