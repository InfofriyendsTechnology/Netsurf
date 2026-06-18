import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetPublicProductsQuery } from '../../services/publicProductApi';
import { MdPlayCircle, MdShoppingCart, MdAddShoppingCart, MdStar, MdStarHalf } from 'react-icons/md';
import { useToast } from '@netsurf/ui/common/useToast';
import './ProductCatalog.scss';

const categories = ['All', 'Naturamore', 'Biofit', 'Herbs & More', 'Clean & More', 'Rang Dé'];

const ProductCatalog = () => {
    const { data, isLoading } = useGetPublicProductsQuery();
    const [activeCategory, setActiveCategory] = useState('All');
    const { showSuccess } = useToast();

    const products = data?.data || [];

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All') return products;
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);

    return (
        <div className="catalog-page">
            {/* Hero Section */}
            <section className="catalog-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Netsurf</h1>
                    <p className="hero-subtitle">Premium Ayurvedic & Organic Products</p>
                    <p className="hero-tagline">Natural Solutions for Better Living</p>
                </div>
                <div className="hero-glow" />
            </section>

            {/* Category Tabs */}
            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="product-card skeleton">
                            <div className="skeleton-image" />
                            <div className="skeleton-text" />
                            <div className="skeleton-text short" />
                        </div>
                    ))
                ) : filteredProducts.length === 0 ? (
                    <div className="empty-catalog">
                        <p>No products found in this category</p>
                    </div>
                ) : (
                    filteredProducts.map((product, index) => (
                        <Link
                            to={`/catalog/${product._id}`}
                            key={product._id}
                            className="product-card"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <div className="product-image-wrapper">
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Netsurf'; e.target.onerror = null; }}
                                />
                                <span className="product-category-badge">{product.category}</span>
                                {product.youtubeUrl && (
                                    <span className="video-badge">
                                        <MdPlayCircle /> Results Video
                                    </span>
                                )}
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.title}</h3>
                                
                                {/* E-commerce Rating */}
                                <div className="product-rating">
                                    <div className="stars">
                                        <MdStar /><MdStar /><MdStar /><MdStar /><MdStarHalf />
                                    </div>
                                    <span className="rating-count">(4.8)</span>
                                </div>

                                <p className="product-desc">{product.description?.substring(0, 80)}...</p>
                                
                                <div className="product-footer">
                                    <div className="price-wrapper">
                                        <span className="product-price">₹{product.price}</span>
                                        <span className="original-price">₹{product.price + 200}</span>
                                    </div>
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            showSuccess('Added to cart successfully!');
                                        }}
                                    >
                                        <MdAddShoppingCart /> Add
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductCatalog;
