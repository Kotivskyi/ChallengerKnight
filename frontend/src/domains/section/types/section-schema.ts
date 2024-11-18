import { z } from 'zod';

export const SectionFormSchema = z.object({
  name: z.string().min(1, 'Name is required')
});
