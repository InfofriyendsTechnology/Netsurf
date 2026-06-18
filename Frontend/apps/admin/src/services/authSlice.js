import { createSlice } from '@reduxjs/toolkit';

const getUserFromStorage = () => {
    const userStr = localStorage.getItem('netsurfUser');
    if (userStr && userStr !== 'undefined') {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
};

const initialState = {
    user: getUserFromStorage(),
    token: localStorage.getItem('netsurfToken') || null,
    isLoading: false,
    error: null,
    isLogin: localStorage.getItem('netsurfToken') ? true : false,
    message: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
            state.success = false;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLogin = true;
            state.error = null;
            state.message = action.payload.message || 'Login successful';
            state.success = true;
            localStorage.setItem('netsurfUser', JSON.stringify(action.payload.user));
            localStorage.setItem('netsurfToken', action.payload.token);
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.message = action.payload;
            state.success = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLogin = false;
            state.isLoading = false;
            state.error = null;
            state.message = null;
            state.success = false;
            localStorage.removeItem('netsurfUser');
            localStorage.removeItem('netsurfToken');
        },
        clearError: (state) => {
            state.error = null;
            state.message = null;
            state.success = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthSuccess = (state) => state.auth.success;

export default authSlice.reducer;
