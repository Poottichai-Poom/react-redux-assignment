import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Course'],
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => '/courses',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Course', id })), { type: 'Course', id: 'LIST' }]
                    : [{ type: 'Course', id: 'LIST' }],
        }),
        addCourse: builder.mutation({
            query: (course) => ({
                url: '/courses',
                method: 'POST',
                body: course,
            }),
            invalidatesTags: [{ type: 'Course', id: 'LIST' }],
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Course', id }, { type: 'Course', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useAddCourseMutation,
    useDeleteCourseMutation,
} = coursesApi;
