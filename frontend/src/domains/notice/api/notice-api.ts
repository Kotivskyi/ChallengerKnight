import { api, Tag } from '@/api';
import {
  NoticeData,
  NoticeDetailProps,
  NoticeFormProps,
  NoticeFormPropsWithId,
  NoticeRecipient,
  NoticeRecipientWithId,
  RecipientData,
  RecipientResponse,
  ReviewNotice
} from '../types';

export const noticeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<NoticeData, void>({
      query: () => `/notices`,
      providesTags: (result) =>
        result?.notices?.map(({ id }) => {
          return { type: Tag.NOTICES, id };
        }) || [{ type: Tag.NOTICES }]
    }),
    getAllPendingNotices: builder.query<NoticeData, void>({
      query: () => `/notices/pending`,
      providesTags: (result) =>
        result?.notices?.map(({ id }) => {
          return { type: Tag.PENDING_NOTICES, id };
        }) || [{ type: Tag.PENDING_NOTICES }]
    }),
    getNoticeDetail: builder.query<NoticeDetailProps, string | undefined>({
      query: (id) => `/notices/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.NOTICES, id: result.id }] : [])
    }),
    getMyNotices: builder.query<NoticeData, void>({
      query: () => `/notices/me`,
      providesTags: (result) =>
        result?.notices?.map(({ id }) => {
          return { type: Tag.NOTICES, id };
        }) || [{ type: Tag.NOTICES }]
    }),
    addNotice: builder.mutation<{ message: string }, NoticeFormProps>({
      query: (payload) => ({
        url: `/notices`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.NOTICES, Tag.PENDING_NOTICES]
    }),
    updateNotice: builder.mutation<{ message: string }, NoticeFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/notices/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.NOTICES, id },
        { type: Tag.PENDING_NOTICES, id }
      ]
    }),
    handleNoticeStatus: builder.mutation<{ message: string }, ReviewNotice>({
      query: ({ id, status }) => ({
        url: `/notices/${id}/status`,
        method: 'POST',
        body: { status }
      }),
      invalidatesTags: [Tag.NOTICES, Tag.PENDING_NOTICES]
    }),
    getNoticeRecipientList: builder.query<RecipientResponse, void>({
      query: () => `/notices/recipients/list`,
      providesTags: (result) =>
        result?.noticeRecipients?.map(({ id }) => {
          return { type: Tag.NOTICE_RECIPIENT_LIST, id };
        }) || [{ type: Tag.NOTICE_RECIPIENT_LIST }]
    }),
    getNoticeRecipients: builder.query<RecipientData, void>({
      query: () => `/notices/recipients`,
      providesTags: (result) =>
        result?.noticeRecipients?.map(({ id }) => {
          return { type: Tag.NOTICE_RECIPIENTS, id };
        }) || [{ type: Tag.NOTICE_RECIPIENTS }]
    }),
    getNoticeRecipient: builder.query<NoticeRecipientWithId, number>({
      query: (id) => `/notices/recipients/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.NOTICE_RECIPIENTS, id: result.id }] : [])
    }),
    addNoticeRecipient: builder.mutation<{ message: string }, NoticeRecipient>({
      query: (payload) => ({
        url: `/notices/recipients`,
        method: 'POST',
        body: { ...payload }
      }),
      invalidatesTags: [Tag.NOTICE_RECIPIENTS]
    }),
    updateNoticeRecipient: builder.mutation<{ message: string }, NoticeRecipientWithId>({
      query: ({ id, ...rest }) => ({
        url: `/notices/recipients/${id}`,
        method: 'PUT',
        body: { ...rest }
      }),
      invalidatesTags: (result, _error, { id }) =>
        result ? [{ type: Tag.NOTICE_RECIPIENTS, id }] : []
    }),
    deleteNoticeRecipient: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/notices/recipients/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, _error, id) => (result ? [{ type: Tag.NOTICE_RECIPIENTS, id }] : [])
    })
  })
});

export const {
  useGetNoticesQuery,
  useGetNoticeDetailQuery,
  useGetMyNoticesQuery,
  useLazyGetNoticeRecipientListQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useHandleNoticeStatusMutation,
  useGetNoticeRecipientsQuery,
  useGetNoticeRecipientQuery,
  useAddNoticeRecipientMutation,
  useUpdateNoticeRecipientMutation,
  useDeleteNoticeRecipientMutation,
  useGetAllPendingNoticesQuery
} = noticeApi;
