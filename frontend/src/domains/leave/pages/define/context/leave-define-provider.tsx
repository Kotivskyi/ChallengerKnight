import * as React from 'react';
import { Action, initialState, LeaveDefineContext, State } from './leave-define-context';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_POLICY_TAB':
      return {
        ...state,
        policyTab: action.payload
      };
    case 'SET_POLICIES':
      return {
        ...state,
        policies: action.payload
      };
    default:
      return state;
  }
};

export const LeaveDefineProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <LeaveDefineContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaveDefineContext.Provider>
  );
};

export const useLeaveDefine = () => React.useContext(LeaveDefineContext);
