import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { api } from '../api';
import { appReducer } from './app-reducer';
import { purgeMiddleware } from './middleware';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [api.reducerPath]
};

const persistedRootReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .concat(api.middleware)
      .concat(purgeMiddleware)
});

export const persistor = persistStore(store);
export { store };
export type RootState = ReturnType<typeof store.getState>;
