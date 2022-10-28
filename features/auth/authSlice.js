import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from '@/services/authService';
import * as userAPI from '@/services/userService';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey
} from '@/utils/index';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.nextRegister({ ...userData });
      toast.success('Account created successfully');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.nextLogin({ ...userData });
      toast.success('Logged in successfully');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.forgot({ email });
      toast.success('Token sent to email successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.reset(token, credentials);
      toast.success('Token sent to email successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateMe',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.updateMe({ ...userData });
      toast.success('Account updated successfully');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.updatePassword({ ...userData });
      toast.success('Pasword changed successfully');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.nextLogout();
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJwt();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = new Date().getTime();

  if (decodedToken.exp * 1000 < expiryDate) {
    removeFromStorage(tokenKey);
    initialState.user = null;
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    setLogout: (state) => {
      removeFromStorage(tokenKey);
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.user = payload;
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        setToStorage(tokenKey, payload);
        state.user = payload;
      })
      .addCase(updateUserPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        removeFromStorage(tokenKey);
        state.user = null;
      })
  },
});

export const { reset, setLogout } = authSlice.actions;

export default authSlice.reducer;
