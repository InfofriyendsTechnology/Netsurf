import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../services/authSlice';
import { authApi } from '../services/authApi';
import { productApi } from '../services/productApi';
import { themeApi } from '../services/themeApi';
import { publicProductApi } from '../services/publicProductApi';

const persistConfig = {
    key: 'netsurf',
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [themeApi.reducerPath]: themeApi.reducer,
    [publicProductApi.reducerPath]: publicProductApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                ],
            },
        }).concat(
            authApi.middleware,
            productApi.middleware,
            themeApi.middleware,
            publicProductApi.middleware
        ),
});

export const persistor = persistStore(store);
export default store;
