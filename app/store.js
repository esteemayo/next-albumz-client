import { configureStore } from '@reduxjs/toolkit';

import toggleReducer from '@/features/toggle/toggleSlice';

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});

export default store;
