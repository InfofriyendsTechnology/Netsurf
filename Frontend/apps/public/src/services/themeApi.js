import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../store/baseQuery';

export const themeApi = createApi({
    reducerPath: 'themeApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Theme'],
    endpoints: (builder) => ({
        getTheme: builder.query({
            query: () => '/themes',
            providesTags: ['Theme'],
        }),
        updateTheme: builder.mutation({
            query: (themeData) => ({
                url: '/themes',
                method: 'PUT',
                body: themeData,
            }),
            invalidatesTags: ['Theme'],
        }),
    }),
});

export const {
    useGetThemeQuery,
    useUpdateThemeMutation,
} = themeApi;
