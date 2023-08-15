import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authReducer from '@/features/auth/authSlice';
import viewsReducer from '@/features/views/viewSlice';
import toggleReducer from '@/features/toggle/toggleSlice';
import bookmarkReducer from '@/features/bookmark/bookmarkSlice';
import darkModeReducer from '@/features/darkMode/darkModeSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  views: viewsReducer,
  toggle: toggleReducer,
  bookmark: bookmarkReducer,
  darkMode: darkModeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { persistor, store };
