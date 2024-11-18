import { StudentFormAction, StudentFormState, StudentProps } from '../types';

export const studentFormInitialState: StudentProps = {
  name: '',
  gender: '',
  dob: new Date(),
  phone: '',
  email: '',
  class: '',
  section: '',
  roll: '',
  admissionDate: new Date(),
  fatherName: '',
  fatherPhone: '',
  motherName: '',
  motherPhone: '',
  guardianName: '',
  guardianPhone: '',
  relationOfGuardian: '',
  currentAddress: '',
  permanentAddress: '',
  systemAccess: false
};

export const studentFormReducer = (
  state: StudentFormState,
  action: StudentFormAction
): StudentFormState => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'SET_FIELD': {
      const { section, name, value } = action.payload;
      if (section && section in state) {
        const sectionState = state[section as keyof StudentFormState];
        if (typeof sectionState === 'object' && sectionState !== null) {
          return {
            ...state,
            [section]: {
              ...sectionState,
              [name]: value
            }
          };
        }
      }

      return {
        ...state,
        [name]: value
      };
    }
    case 'RESET_FIELD':
      return action.payload;
    default:
      return state;
  }
};
