import { z } from 'zod';
import { NameIdType } from '@/utils/type/misc';
import { ClassPropsWithId } from '@/domains/class/types';
import {
  AcademicInfoSchema,
  AddressInfoSchema,
  BasicInfoSchema,
  OtherInfoSchema,
  ParentsAndGuardianInfoSchema,
  StudentFilterSchema,
  StudentSchema
} from './student-schema';
import { UserAccountBasicProps } from '@/components/user-account-basic';

export type Student = {
  id: number;
  name: string;
  email: string;
  role: string;
  systemAccess: boolean;
  lastLogin: Date;
};

export type StudentFilterState = {
  classes: ClassPropsWithId[];
  class: string;
  section: string;
  name: string;
  roll: string;
};

export type StudentFilterActions =
  | { type: 'SET_CLASSES'; payload: ClassPropsWithId[] | [] }
  | { type: 'SET_UPDATE_VALUES'; payload: { name: string; value: string } };

export type StudentState = {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  students: Student[] | [];
};

export type AddressInfo = z.infer<typeof AddressInfoSchema>;
export type BasicInfo = z.infer<typeof BasicInfoSchema>;
export type AcademicInfo = z.infer<typeof AcademicInfoSchema>;
export type ParentsAndGuardianInfo = z.infer<typeof ParentsAndGuardianInfoSchema>;
export type OtherInfo = z.infer<typeof OtherInfoSchema>;

export type StudentFormState = {
  basicInfo: BasicInfo;
  academicInfo: AcademicInfo;
  parentsAndGuardianInfo: ParentsAndGuardianInfo;
  addressInfo: AddressInfo;
  otherInfo: OtherInfo;
};

type SetFieldAction = {
  type: 'SET_FIELD';
  payload: {
    section: string;
    name: string;
    value: string | number | Date | null | boolean;
  };
};
type SetStateAction = { type: 'SET_STATE'; payload: StudentFormState };
type ResetFieldAction = { type: 'RESET_FIELD'; payload: StudentFormState };
export type StudentFormAction = SetFieldAction | SetStateAction | ResetFieldAction;

export type StudentFilter = z.infer<typeof StudentFilterSchema>;

export type StudentProps = z.infer<typeof StudentSchema>;

export type StudentPropsWithId = StudentProps & { id: number };
export type GetStudentDetailProps = StudentPropsWithId & { reporterName: string };
export type StudentData = {
  students: UserAccountBasicProps[];
};

export type StudentDetail = {
  student: StudentPropsWithId;
};

export type AddStudent = {
  message: string;
  id: number;
};

export type ReviewStudentStatusRequest = {
  id: number;
  status: boolean;
};

export type GetTeachers = {
  teachers: NameIdType[];
};
