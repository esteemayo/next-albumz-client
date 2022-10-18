import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createView, getViewsOnAlbum } from '@/services/viewService';

const initialState = {
  views: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const viewSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = viewSlice.actions;

export default viewSlice.reducer;
