import { z } from 'zod';
import { LeaveRequestApiSchema, LeaveRequestFormSchema, PolicyUsersSchema } from './leave-schema';
import { User } from '@/domains/auth/types';

export type LeavePolicy = {
  id: number;
  name: string;
  icon: string;
  isActive: boolean;
  totalUsersAssociated: number;
};

export type MyLeavePolicy = {
  id: number;
  name: string;
  icon: string;
  totalDaysUsed: number;
};

export type MyLeaveRequestDetail = {
  id: number;
  user: string;
  from: string;
  status: string;
  statusId: number;
  to: string;
  note: string;
  policy: string;
  policyId: number;
  days: number;
  submitted: string;
  updated: string;
  approved: string;
  approver: string;
};

export type PolicyUser = {
  id: number;
  name: string;
  role: string;
  totalDaysUsed: string;
};

export type PolicyDetail = {
  id: number;
  name: string;
  operation: string;
};

export type PolicyUsers = z.infer<typeof PolicyUsersSchema>;

export type LeaveRequestForm = z.infer<typeof LeaveRequestFormSchema>;
export type LeaveRequestApi = z.infer<typeof LeaveRequestApiSchema>;
export type LeaveRequestApiWithId = LeaveRequestApi & { id: number | undefined };
export type LeaveRequestHistory = {
  leaveHistory: MyLeaveRequestDetail[];
};
export type PendingLeaveRequestHistory = {
  pendingLeaves: MyLeaveRequestDetail[];
};
export type LeavePolicyData = {
  leavePolicies: LeavePolicy[];
};

export type EligiblePolicyUsers = {
  users: Omit<User, 'lastLogin'>[];
};

export type PolicyUserData = {
  users: PolicyUser[];
};

export type AddUserToPolicy = {
  userList: string;
  id: number;
};

export type RemoveUserFromPolicy = {
  userId: number;
  policyId: number;
};

export type PolicyStatus = {
  id: number;
  status: boolean;
};

export type LeaveStatus = {
  id: number;
  status: number;
};

export type MyLeavePolicyData = {
  leavePolicies: MyLeavePolicy[];
};
