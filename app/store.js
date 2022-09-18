import { configureStore } from '@reduxjs/toolkit';

import toggleReducer from '@/features/toggle/toggleSlice';
import darkModeReducer from '@/features/darkMode/darkModeSlice';

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
