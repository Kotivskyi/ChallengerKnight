import * as React from 'react';
import { ExtendedPermission, RoleWithUsersAssociated } from '../types';

export const initialState = {
  roleTab: 0,
  roles: [],
  permissions: []
};
export type State = {
  roleTab: number;
  roles: RoleWithUsersAssociated[];
  permissions: ExtendedPermission[];
};
export type Action =
  | { type: 'SET_ROLE_TAB'; payload: number }
  | { type: 'SET_ROLES'; payload: RoleWithUsersAssociated[] }
  | { type: 'SET_PERMISSIONS'; payload: ExtendedPermission[] };

type DefaultContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
const defaultValues: DefaultContext = {
  state: initialState,
  dispatch: () => {}
};

export const RolePermissionContext = React.createContext(defaultValues);
