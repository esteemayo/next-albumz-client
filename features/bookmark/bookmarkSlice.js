import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookmarkAPI from '@/services/bookmarkService';

export const fetchBookmark = createAsyncThunk(
  'bookmark/getBookmark',
  async (albumId, { rejectWithValue}) => {
    try {
      const { data } = await bookmarkAPI.getBookmark(albumId);
      return data.bookmark;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const createNewBookmark = createAsyncThunk(
  'bookmark/createBookmark',
  async ({ album, toast }, { rejectWithValue}) => {
    try {
      const { data } = await bookmarkAPI.createBookmark({ album });
      toast.success('Album bookmarked');
      return data.bookmark;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmark/deleteBookmark',
  async ({ bookmarkId, toast }, { rejectWithValue}) => {
    try {
      await bookmarkAPI.deleteBookmark(bookmarkId);
      toast.success('Album unbookmarked');
      return;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  bookmark: null,
  isError: false,
  isSuccess: false,
  message: '',
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookmark.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.bookmark = payload;
      })
      .addCase(fetchBookmark.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(createNewBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBookmark.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.bookmark = payload;
      })
      .addCase(createNewBookmark.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(removeBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeBookmark.fulfilled, (state) => {
        state.isLoading = false;
        state.bookmark = null;
      })
      .addCase(removeBookmark.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export default bookmarkSlice.reducer;
