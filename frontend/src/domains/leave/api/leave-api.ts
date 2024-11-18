import { api, Tag } from '@/api';
import {
  LeavePolicyData,
  LeaveRequestApi,
  PolicyDetail,
  PolicyUserData,
  AddUserToPolicy,
  RemoveUserFromPolicy,
  EligiblePolicyUsers,
  PolicyStatus,
  LeaveRequestHistory,
  LeaveRequestApiWithId,
  MyLeavePolicyData,
  PendingLeaveRequestHistory,
  LeaveStatus
} from '../types';

export const leaveApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyLeaveHistory: builder.query<LeaveRequestHistory, void>({
      query: () => `/leave/request`,
      providesTags: (result) =>
        result?.leaveHistory.map(({ id }) => {
          return { type: Tag.LEAVE_HISTORY, id };
        }) || [{ type: Tag.LEAVE_HISTORY }]
    }),
    applyLeaveRequest: builder.mutation<{ message: string }, LeaveRequestApi>({
      query: (payload) => ({
        url: `/leave/request`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (result) => (result ? [Tag.LEAVE_HISTORY, Tag.PENDING_LEAVES] : [])
    }),
    updateLeaveRequest: builder.mutation<{ message: string }, LeaveRequestApiWithId>({
      query: ({ id, ...restPayload }) => ({
        url: `/leave/request/${id}`,
        method: 'PUT',
        body: { ...restPayload }
      }),
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: Tag.LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
          : []
    }),
    deleteLeaveRequest: builder.mutation<{ message: string }, number | undefined>({
      query: (id) => ({
        url: `/leave/request/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, _error, id) =>
        result
          ? [
              { type: Tag.LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
          : []
    }),

    getLeavePending: builder.query<PendingLeaveRequestHistory, void>({
      query: () => `/leave/pending`,
      providesTags: (result) =>
        result?.pendingLeaves.map(({ id }) => {
          return { type: Tag.PENDING_LEAVES, id };
        }) || [{ type: Tag.PENDING_LEAVES }]
    }),
    handlePendingLeaveStatus: builder.mutation<{ message: string }, LeaveStatus>({
      query: ({ id, status }) => ({
        url: `/leave/pending/${id}/status`,
        method: 'POST',
        body: { status }
      }),
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: Tag.LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
          : []
    }),
    getLeavePolicies: builder.query<LeavePolicyData, void>({
      query: () => '/leave/policies',
      providesTags: (result) =>
        result?.leavePolicies.map(({ id }) => {
          return { type: Tag.LEAVE_POLICIES, id };
        }) || [{ type: Tag.LEAVE_POLICIES }]
    }),
    getEligibleLeavePolicyUsers: builder.query<EligiblePolicyUsers, void>({
      query: () => `leave/policies/eligible-users`,
      providesTags: (result) =>
        result?.users.map(({ id }) => {
          return { type: Tag.LEAVE_ELIGIBLE_USERS, id };
        }) || [{ type: Tag.LEAVE_ELIGIBLE_USERS }]
    }),
    getLeavePolicyUsers: builder.query<PolicyUserData, number>({
      query: (id) => `/leave/policies/${id}/users`,
      providesTags: (result) =>
        result?.users.map(({ id }) => {
          return { type: Tag.LEAVE_POLICY_USERS, id };
        }) || [{ type: Tag.LEAVE_POLICY_USERS }]
    }),
    addLeavePolicy: builder.mutation<{ message: string }, Pick<PolicyDetail, 'name'>>({
      query: ({ name }) => ({
        url: `/leave/policies`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (result) => (result ? [Tag.LEAVE_POLICIES] : [])
    }),
    updateLeavePolicy: builder.mutation<{ message: string }, Pick<PolicyDetail, 'name' | 'id'>>({
      query: ({ id, name }) => ({
        url: `/leave/policies/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (result, _error, { id }) =>
        result ? [{ type: Tag.LEAVE_POLICIES, id }] : []
    }),
    handleLeavePolicy: builder.mutation<{ message: string }, PolicyStatus>({
      query: ({ id, status }) => ({
        url: `/leave/policies/${id}/status`,
        method: 'POST',
        body: { status }
      }),
      invalidatesTags: (result, _error, { id }) =>
        result ? [{ type: Tag.LEAVE_POLICIES, id }] : []
    }),
    addUserToPolicy: builder.mutation<{ message: string }, AddUserToPolicy>({
      query: ({ userList, id }) => ({
        url: `/leave/policies/${id}/users`,
        method: 'POST',
        body: { users: userList }
      }),
      invalidatesTags: (result) =>
        result
          ? [
              Tag.LEAVE_POLICY_USERS,
              Tag.LEAVE_ELIGIBLE_USERS,
              Tag.LEAVE_POLICIES,
              Tag.MY_LEAVE_POLICIES
            ]
          : []
    }),
    removeUserFromPolicy: builder.mutation<{ message: string }, RemoveUserFromPolicy>({
      query: ({ userId, policyId }) => ({
        url: `/leave/policies/${policyId}/users`,
        method: 'DELETE',
        body: { user: userId }
      }),
      invalidatesTags: (result, _error, { userId }) => {
        return result
          ? [
              { type: Tag.LEAVE_POLICY_USERS, id: userId },
              Tag.MY_LEAVE_POLICIES,
              Tag.LEAVE_POLICY_USERS
            ]
          : [];
      }
    }),
    getMyLeavePolicies: builder.query<MyLeavePolicyData, void>({
      query: () => `/leave/policies/me`,
      providesTags: (result) =>
        result?.leavePolicies.map(({ id }) => {
          return { type: Tag.MY_LEAVE_POLICIES, id };
        }) || [{ type: Tag.MY_LEAVE_POLICIES }]
    })
  })
});

export const {
  useGetMyLeaveHistoryQuery,
  useGetLeavePendingQuery,
  useGetLeavePoliciesQuery,
  useGetEligibleLeavePolicyUsersQuery,
  useGetLeavePolicyUsersQuery,
  useAddLeavePolicyMutation,
  useUpdateLeavePolicyMutation,
  useHandleLeavePolicyMutation,
  useAddUserToPolicyMutation,
  useRemoveUserFromPolicyMutation,
  useApplyLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
  useGetMyLeavePoliciesQuery,
  useHandlePendingLeaveStatusMutation
} = leaveApi;
