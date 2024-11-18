import { z } from 'zod';
import { SectionFormSchema } from './section-schema';

export type SectionForm = z.infer<typeof SectionFormSchema>;
export type SectionFormWithId = SectionForm & { id: number };
export type SectionData = {
  sections: SectionFormWithId[];
};
