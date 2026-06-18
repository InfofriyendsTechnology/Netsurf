import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../store/baseQuery';
import { loginSuccess, loginFailure, logout as logoutAction } from './authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(loginSuccess({
                        user: data.user,
                        token: data.token,
                        message: data.message || 'Login successful',
                    }));
                } catch (error) {
                    dispatch(loginFailure(
                        error?.error?.data?.message || 'Login failed. Please try again.'
                    ));
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;

// Logout thunk
export const logoutUser = () => (dispatch) => {
    dispatch(logoutAction());
    dispatch(authApi.util.resetApiState());
};
