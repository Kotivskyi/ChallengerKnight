import { api, Tag } from '@/api';

import { DepartmentData, DepartmentForm, DepartmentFormWithId } from '../types';

const departmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentData, void>({
      query: () => `/departments`,
      providesTags: (result) =>
        result?.departments?.map(({ id }) => {
          return { type: Tag.DEPARTMENTS, id };
        }) || [{ type: Tag.DEPARTMENTS }]
    }),
    addNewDepartment: builder.mutation<{ message: string }, DepartmentForm>({
      query: ({ name }) => ({
        url: `/departments`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (result) => (result ? [Tag.DEPARTMENTS] : [])
    }),
    getDepartment: builder.query<DepartmentFormWithId, number>({
      query: (id) => `departments/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.DEPARTMENTS, id: result.id }] : [])
    }),
    updateDepartment: builder.mutation<{ message: string }, DepartmentFormWithId>({
      query: ({ id, name }) => ({
        url: `/departments/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (result, _error, { id }) => (result ? [{ type: Tag.DEPARTMENTS, id }] : [])
    }),
    deleteDepartment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? [Tag.DEPARTMENTS] : [])
    })
  })
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useAddNewDepartmentMutation
} = departmentApi;
