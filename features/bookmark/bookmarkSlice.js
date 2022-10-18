import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookmarkAPI from '@/services/bookmarkService';

const initialState = {
  bookmark: null,
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
});

export default bookmarkSlice.reducer;
