import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../store/baseQuery';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products',
            providesTags: ['Products'],
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        createProduct: builder.mutation({
            query: (productData) => ({
                url: '/products',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...productData }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: productData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Products', id },
                'Products',
            ],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
