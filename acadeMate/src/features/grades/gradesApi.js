import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gradesApi = createApi({
    reducerPath: 'gradesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Grade'],
    endpoints: (builder) => ({
        getGrades: builder.query({
            query: () => '/grades',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Grade', id })), { type: 'Grade', id: 'LIST' }]
                    : [{ type: 'Grade', id: 'LIST' }],
        }),
        addGrade: builder.mutation({
            query: (grade) => ({
                url: '/grades',
                method: 'POST',
                body: grade,
            }),
            invalidatesTags: [{ type: 'Grade', id: 'LIST' }],
        }),
        updateGrade: builder.mutation({
            query: (grade) => ({
                url: `/grades/${grade.id}`,
                method: 'PUT',
                body: grade,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Grade', id }],
        }),
        deleteGrade: builder.mutation({
            query: (id) => ({
                url: `/grades/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Grade', id }, { type: 'Grade', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetGradesQuery,
    useAddGradeMutation,
    useUpdateGradeMutation,
    useDeleteGradeMutation,
} = gradesApi;
