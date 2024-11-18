import { StudentFilterActions, StudentFilterState } from '../types';

export const studentFilterReducer = (state: StudentFilterState, action: StudentFilterActions) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload };
    case 'SET_UPDATE_VALUES':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    default:
      return state;
  }
};
