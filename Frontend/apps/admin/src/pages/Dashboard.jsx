import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../services/authSlice';
import { useGetProductsQuery } from '../services/productApi';
import { StatCardSkeleton } from '@netsurf/ui/common/SkeletonLoader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Dashboard.scss';

const Dashboard = () => {
    const user = useSelector(selectCurrentUser);
    const { data: productsData, isLoading } = useGetProductsQuery();
    
    useDocumentTitle('Dashboard');

    const products = productsData?.products || productsData?.data || [];
    
    // Group products by category
    const categories = products.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = 0;
        acc[curr.category]++;
        return acc;
    }, {});
    
    const topCategory = Object.keys(categories).length > 0 
        ? Object.entries(categories).sort((a, b) => b[1] - a[1])[0][0] 
        : 'None';

    const stats = {
        totalProducts: products.length,
        activeProducts: products.filter((p) => p.isActive !== false).length,
        inactiveProducts: products.filter((p) => p.isActive === false).length,
        totalCategories: Object.keys(categories).length,
        topCategory: topCategory
    };

    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        if (hour < 21) return 'Good Evening';
        return 'Good Night';
    };

    return (
        <div className="dashboard-content">
            {isLoading ? (
                <div className="dashboard-skeleton">
                    <div className="skeleton-greeting-bar" />
                    <StatCardSkeleton count={2} />
                    <StatCardSkeleton count={3} />
                </div>
            ) : (
                <>
                    <div className="dashboard-greeting">
                        <div className="greeting-content">
                            <div className="greeting-text">
                                <span className="greeting-prefix">{getGreeting()},</span>
                                <h2 className="greeting-name">{user?.username || user?.name || 'Admin'}!</h2>
                                <p className="greeting-tagline">
                                    <svg className="rocket-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Managing Ayurvedic & Organic Products with Netsurf
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="stats-grid-top">
                        <div className="stat-card companies">
                            <h3>Total Products</h3>
                            <p className="stat-number">{stats.totalProducts}</p>
                            <p className="stat-details">{stats.activeProducts} Active • {stats.inactiveProducts} Inactive</p>
                        </div>
                        <div className="stat-card inquiries">
                            <h3>Product Categories</h3>
                            <p className="stat-number">{stats.totalCategories}</p>
                            <p className="stat-details">Across all brands</p>
                        </div>
                    </div>

                    <div className="stats-grid-bottom">
                        <div className="stat-card reviews">
                            <h3>Active Inventory</h3>
                            <p className="stat-number">{stats.activeProducts}</p>
                            <p className="stat-details">Currently visible to customers</p>
                        </div>
                        <div className="stat-card used">
                            <h3>Top Category</h3>
                            <p className="stat-number" style={{ fontSize: '1.5rem', lineHeight: '2' }}>{stats.topCategory}</p>
                            <p className="stat-details">Most products listed</p>
                        </div>
                        <div className="stat-card unused">
                            <h3>Inactive Items</h3>
                            <p className="stat-number">{stats.inactiveProducts}</p>
                            <p className="stat-details">Hidden from store</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
