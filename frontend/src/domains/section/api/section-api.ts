import { api, Tag } from '@/api';
import { SectionData, SectionFormWithId, SectionForm } from '../types';

const sectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query<SectionData, void>({
      query: () => `/sections`,
      providesTags: (result) =>
        result?.sections?.map(({ id }) => {
          return { type: Tag.SECTIONS, id };
        }) || [{ type: Tag.SECTIONS }]
    }),
    addNewSection: builder.mutation<{ message: string }, SectionForm>({
      query: ({ name }) => ({
        url: `/sections`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (result) => (result ? [Tag.SECTIONS] : [])
    }),
    getSection: builder.query<SectionFormWithId, number>({
      query: (id) => `sections/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.SECTIONS, id: result.id }] : [])
    }),
    updateSection: builder.mutation<{ message: string }, SectionFormWithId>({
      query: ({ id, name }) => ({
        url: `/sections/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (result, _error, { id }) => (result ? [{ type: Tag.SECTIONS, id }] : [])
    }),
    deleteSection: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/sections/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? [Tag.SECTIONS] : [])
    })
  })
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useAddNewSectionMutation
} = sectionApi;
