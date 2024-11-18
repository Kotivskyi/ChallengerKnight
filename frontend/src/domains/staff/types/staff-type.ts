import { z } from 'zod';
import {
  BasicInfoSchema,
  ParentsInfoSchema,
  StaffFilterSchema,
  StaffFormSchema
} from './staff-schema';
import { UserAccountBasicProps } from '@/components/user-account-basic';

export type StaffFilter = z.infer<typeof StaffFilterSchema>;

export type StaffFormProps = z.infer<typeof StaffFormSchema>;
export type StaffFormPropsWithId = StaffFormProps & { id: number };
export type StaffStatusRequest = {
  id: number;
  status: boolean;
};

export type StaffData = {
  staffs: UserAccountBasicProps[];
};

export type ParentsInfo = z.infer<typeof ParentsInfoSchema>;

export type BasicInfo = z.infer<typeof BasicInfoSchema>;
