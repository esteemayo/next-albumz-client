import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createView, getViewsOnAlbum } from '@/services/viewService';

export const getViews =  createAsyncThunk(
  'views/getViews',
  async (albumId, { rejectWithValue }) => {
    try {
      const { data } = await getViewsOnAlbum({ album: albumId });
      return data.histories;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const createViews =  createAsyncThunk(
  'views/createViews',
  async (album, { rejectWithValue }) => {
    try {
      const { data } = await createView(album);
      return data.history;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getViews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getViews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.views = payload;
      })
      .addCase(getViews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(createViews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createViews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.views.push(payload);
      })
      .addCase(createViews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export const { reset } = viewSlice.actions;

export default viewSlice.reducer;
