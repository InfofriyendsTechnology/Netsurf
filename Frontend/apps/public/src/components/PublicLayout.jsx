import { Outlet, Link } from 'react-router-dom';
import { MdSearch, MdPersonOutline, MdShoppingCart, MdLocalShipping, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './PublicLayout.scss';

const PublicLayout = () => {
    return (
        <div className="public-layout">
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <p><MdLocalShipping /> Free shipping on all orders over ₹2000! Shop Now</p>
            </div>

            {/* Main Header */}
            <header className="public-header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="header-logo">
                        <Link to="/catalog">
                            <h1>Netsurf</h1>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="header-search">
                        <input type="text" placeholder="Search for products, categories..." />
                        <button className="search-btn">
                            <MdSearch />
                        </button>
                    </div>

                    {/* User Actions */}
                    <div className="header-actions">
                        <button className="action-icon">
                            <MdPersonOutline />
                            <span>Account</span>
                        </button>
                        <button className="action-icon cart-icon">
                            <MdShoppingCart />
                            <span>Cart</span>
                            <span className="cart-badge">0</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="public-content">
                <Outlet />
            </main>

            {/* Premium Footer */}
            <footer className="public-footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Column 1: About */}
                        <div className="footer-col about-col">
                            <h2>Netsurf</h2>
                            <p>Premium Ayurvedic and Organic products crafted for your daily health, wellness, and agricultural needs. Natural solutions for better living.</p>
                            <div className="social-icons">
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaTwitter /></a>
                                <a href="#"><FaInstagram /></a>
                                <a href="#"><FaYoutube /></a>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="footer-col">
                            <h3>Shop Categories</h3>
                            <ul>
                                <li><Link to="#">Naturamore Nutrition</Link></li>
                                <li><Link to="#">Biofit Agriculture</Link></li>
                                <li><Link to="#">Herbs & More</Link></li>
                                <li><Link to="#">Clean & More</Link></li>
                                <li><Link to="#">Rang Dé Cosmetics</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Customer Service */}
                        <div className="footer-col">
                            <h3>Customer Service</h3>
                            <ul>
                                <li><Link to="#">Track Order</Link></li>
                                <li><Link to="#">Returns & Refunds</Link></li>
                                <li><Link to="#">Shipping Information</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">Terms & Conditions</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div className="footer-col contact-col">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><MdLocationOn className="contact-icon" /> <span>Netsurf HQ, Baner, Pune, Maharashtra 411045</span></li>
                                <li><MdPhone className="contact-icon" /> <span>+91 98765 43210</span></li>
                                <li><MdEmail className="contact-icon" /> <span>support@netsurf.com</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-container">
                        <p>&copy; {new Date().getFullYear()} Netsurf Communications Pvt. Ltd. All rights reserved.</p>
                        <div className="payment-methods">
                            {/* Placeholders for payment icons */}
                            <span className="pay-badge">Visa</span>
                            <span className="pay-badge">Mastercard</span>
                            <span className="pay-badge">UPI</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
