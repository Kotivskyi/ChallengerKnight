import { StaffFormProps } from '../../types';

export const staffInitialState: StaffFormProps = {
  name: '',
  role: 0,
  roleName: '',
  gender: '',
  maritalStatus: '',
  phone: '',
  email: '',
  dob: new Date(),
  joinDate: new Date(),
  qualification: '',
  experience: '',
  currentAddress: '',
  permanentAddress: '',
  fatherName: '',
  motherName: '',
  emergencyPhone: '',
  reporterId: 0,
  systemAccess: false
};
