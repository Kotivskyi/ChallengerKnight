import { api, Tag } from '@/api';
import { ClassData, ClassDataProps, ClassDataPropsWithId } from '../types';

export const classApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<ClassData, void>({
      query: () => `/classes`,
      providesTags: (result) =>
        result?.classes?.map(({ id }) => {
          return { type: Tag.CLASSES, id };
        }) || [{ type: Tag.CLASSES }]
    }),
    getClassDetail: builder.query<ClassDataPropsWithId, string | undefined>({
      query: (id) => `/classes/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.CLASSES, id: result.id }] : [])
    }),
    addClass: builder.mutation<{ message: string }, ClassDataProps>({
      query: (payload) => ({
        url: `/classes`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.CLASSES]
    }),
    updateClass: builder.mutation<{ message: string }, ClassDataPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.CLASSES, id }]
    }),
    deleteClass: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/classes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [Tag.CLASSES]
    })
  })
});

export const {
  useGetClassesQuery,
  useLazyGetClassesQuery,
  useGetClassDetailQuery,
  useAddClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation
} = classApi;
