import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/authSlice';
import { MdDashboard, MdInventory2, MdPalette, MdSettings, MdLogout, MdMenu, MdClose, MdLightMode, MdDarkMode } from 'react-icons/md';
import useDocumentTitle from '../hooks/useDocumentTitle';
import '../pages/Dashboard.scss';

// Default menu configuration
const defaultMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
    { id: 'products', label: 'Products', icon: MdInventory2, path: '/products' },
    { id: 'theme', label: 'Theme Settings', icon: MdPalette, path: '/theme' },
    { id: 'settings', label: 'Settings', icon: MdSettings, path: '/settings' }
];

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuItems] = useState(defaultMenuItems);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === null ? true : saved === 'true';
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
    };

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.documentElement.classList.toggle('light-mode', !newMode);
        document.documentElement.classList.toggle('dark-mode', newMode);
        
        // Update CSS variables based on theme mode and current color
        const savedColor = localStorage.getItem('themeColor') || 'silver';
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { darkMode: newMode, color: savedColor } }));
    };

    // Apply theme on mount
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const isActive = (path) => location.pathname === path;

    // Get page title based on current route
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Dashboard';
        if (path === '/products') return 'Products';
        if (path === '/theme') return 'Theme Settings';
        if (path === '/settings') return 'Settings';
        return 'Netsurf';
    };

    // Update document title when route changes
    useDocumentTitle(getPageTitle());

    return (
        <div className="dashboard-container">
            {/* Overlay for mobile - click to close sidebar */}
            {sidebarOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-header-content">
                        <h2>Netsurf</h2>
                        <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
                            <MdClose />
                        </button>
                    </div>
                    <p className="slogan">Ayurvedic & Organic</p>
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Link 
                                key={item.id}
                                to={item.path} 
                                className={`nav-item ${isActive(item.path) ? 'active' : ''}`} 
                                onClick={() => setSidebarOpen(false)}
                            >
                                <IconComponent className="nav-icon" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={toggleTheme} className="sidebar-theme-btn" title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                        {isDarkMode ? <MdLightMode className="theme-icon" /> : <MdDarkMode className="theme-icon" />}
                    </button>
                    <button onClick={handleLogout} className="sidebar-logout-btn">
                        <MdLogout className="logout-icon" />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <button className="menu-toggle-mobile" onClick={() => setSidebarOpen(true)}>
                        <MdMenu />
                    </button>
                    <div className="top-bar-left">
                        <h1>
                            {location.pathname === '/dashboard' && 'Dashboard'}
                            {location.pathname === '/products' && 'Products'}
                            {location.pathname === '/theme' && 'Theme Settings'}
                            {location.pathname === '/settings' && 'Settings'}
                        </h1>
                        <p className="header-subtitle">
                            {location.pathname === '/dashboard' && 'Admin Overview'}
                            {location.pathname === '/products' && 'Manage Product Inventory'}
                            {location.pathname === '/theme' && 'Application Styling'}
                            {location.pathname === '/settings' && 'Customize Your Application'}
                        </p>
                    </div>
                    <div className="user-menu">
                        {location.pathname === '/products' && (
                            <button 
                                onClick={() => window.dispatchEvent(new Event('openProductModal'))} 
                                className="add-action-btn"
                            >
                                <span className="btn-text">+ Add Product</span>
                                <span className="btn-icon">+</span>
                            </button>
                        )}
                    </div>
                </header>
                <div className="scrollable-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
