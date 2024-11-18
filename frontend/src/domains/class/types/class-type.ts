import { z } from 'zod';
import { ClassDataSchema, ClassSchema, ClassTeacherSchema } from './class-schema';

export type ClassData = {
  classes: ClassDataPropsWithId[];
};

export type ClassTeacherData = {
  classTeachers: ClassTeacherDetail[];
};

export type ClassTeacherDetail = {
  id: number;
  class: string;
  section: string;
  teacher?: string;
  teacherId: string;
};

export type ClassProps = z.infer<typeof ClassSchema>;
export type ClassPropsWithId = ClassProps & { id: number };
export type ClassDataProps = z.infer<typeof ClassDataSchema>;
export type ClassDataPropsWithId = ClassDataProps & { id: number };
export type ClassTeacherProps = z.infer<typeof ClassTeacherSchema>;
export type ClassTeacherPropsWithId = ClassTeacherProps & { id: string };

export type Teacher = {
  id: number;
  name: string;
};
export type TeachersData = {
  teachers: Teacher[];
};
