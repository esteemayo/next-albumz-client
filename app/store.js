import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import toggleReducer from '@/features/toggle/toggleSlice';
import bookmarkReducer from '@/features/bookmark/bookmarkSlice';
import darkModeReducer from '@/features/darkMode/darkModeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    toggle: toggleReducer,
    bookmark: bookmarkReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
