import { z } from 'zod';

export const StaffFilterSchema = z
  .object({
    roleId: z.string(),
    staffId: z.string(),
    staffName: z.string()
  })
  .partial();

export const BasicInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.number().min(1, 'Role is required'),
  roleName: z.string().optional().nullable(),
  gender: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string().min(1, 'Marital Status is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().min(1, 'Email is required'),
  dob: z.date(),
  joinDate: z.date(),
  qualification: z.string().optional(),
  experience: z.string().optional()
});
export const AddressInfoSchema = z.object({
  currentAddress: z.string().min(1, 'Current address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required')
});
export const ParentsInfoSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  motherName: z.string().optional(),
  emergencyPhone: z.string().min(1, 'Emergency phone is required')
});
export const OtherInfoSchema = z.object({
  reporterId: z.number().min(1, 'You must select at least one person'),
  systemAccess: z.boolean(),
  reporterName: z.string().optional().nullable()
});
export const StaffFormSchema = BasicInfoSchema.extend(AddressInfoSchema.shape)
  .extend(ParentsInfoSchema.shape)
  .extend(OtherInfoSchema.shape);
