import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/api';

export const publicProductApi = createApi({
    reducerPath: 'publicProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getPublicProducts: builder.query({
            query: () => '/public/products',
        }),
        getPublicProductById: builder.query({
            query: (id) => `/public/products/${id}`,
        }),
    }),
});

export const { useGetPublicProductsQuery, useGetPublicProductByIdQuery } = publicProductApi;
