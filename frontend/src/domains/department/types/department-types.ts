import { z } from 'zod';
import { DepartmentSchema } from './department-schema';

export type DepartmentForm = z.infer<typeof DepartmentSchema>;
export type DepartmentFormWithId = DepartmentForm & { id: number };
export type DepartmentData = {
  departments: DepartmentFormWithId[];
};
