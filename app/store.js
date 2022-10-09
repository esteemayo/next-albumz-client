import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import toggleReducer from '@/features/toggle/toggleSlice';
import darkModeReducer from '@/features/darkMode/darkModeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    toggle: toggleReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
