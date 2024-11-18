import { z } from 'zod';

export const ClassSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  sections: z.array(z.string())
});

export const ClassDataSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  sections: z.string()
});

export const ClassTeacherSchema = z.object({
  class: z.string().min(1, 'Class name is required'),
  section: z.string(),
  teacher: z.number().min(1, 'Teacher is required')
});
