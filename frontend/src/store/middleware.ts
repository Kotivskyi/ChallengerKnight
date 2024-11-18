import { Middleware } from '@reduxjs/toolkit';
import { persistor } from './store';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const purgeMiddleware: Middleware = () => (next) => async (action: any) => {
  if (action.type === 'auth/resetUser') {
    persistor.pause();
    await persistor.flush();
    await persistor.purge();
  } else if (action.type === 'auth/setUser') {
    persistor.pause();
    await persistor.flush();
    await persistor.purge();
    persistor.persist();
  }
  return next(action);
};
