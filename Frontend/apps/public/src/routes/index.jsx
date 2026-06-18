import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import ProductCatalog from '../pages/public/ProductCatalog';
import ProductDetail from '../pages/public/ProductDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <ProductCatalog />,
            },
            {
                path: 'catalog/:id',
                element: <ProductDetail />,
            },
        ],
    },
]);

export default router;
