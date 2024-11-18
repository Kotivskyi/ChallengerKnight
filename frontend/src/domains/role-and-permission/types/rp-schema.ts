import { z } from 'zod';

export const AddEditRoleSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required')
});

export const AddEditPermissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  path: z.string().optional(),
  method: z.string().optional()
});
