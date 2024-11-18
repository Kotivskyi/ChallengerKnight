import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { RootState } from '@/store';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated ?? true;
    },
    resetUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUserPermissions(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          menus: action.payload.menus,
          apis: action.payload.apis,
          uis: action.payload.uis
        };
      }
    }
  }
});

export const { setUser, resetUser, setUserPermissions } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const isUserAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const getUserId = (state: RootState) => state.auth.user?.id;
export const getUserName = (state: RootState) => state.auth.user?.name;
export const getUserEmail = (state: RootState) => state.auth.user?.email;
export const getUserRole = (state: RootState) => state.auth.user?.role;
export const getUserMenus = (state: RootState) => state.auth.user?.menus;
export const getUserScreens = (state: RootState) => state.auth.user?.uis;
