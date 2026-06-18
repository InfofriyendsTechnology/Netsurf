import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import ThemeSettings from '../pages/ThemeSettings';
import Settings from '../pages/Settings';
import Layout from '../components/Layout';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },

    // Admin routes (auth required)
    {
        path: '/',
        element: <PrivateRoute><Layout /></PrivateRoute>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'theme',
                element: <ThemeSettings />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
        ],
    },
]);

export default router;
