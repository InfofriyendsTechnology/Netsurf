import { useState, useMemo, useEffect } from 'react';
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../services/productApi';
import { MdFilterList, MdEdit, MdDelete, MdAdd, MdClose } from 'react-icons/md';
import ShimmerButton from '@netsurf/ui/common/ShimmerButton';
import { TableSkeleton } from '@netsurf/ui/common/SkeletonLoader';
import ConfirmModal from '@netsurf/ui/common/ConfirmModal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useToast } from '@netsurf/ui/common/useToast';
import './Products.scss';

const categories = ['Naturamore', 'Biofit', 'Herbs & More', 'Clean & More', 'Rang Dé'];

const Products = () => {
    useDocumentTitle('Products');
    
    const { data: productsData, isLoading } = useGetProductsQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const { showSuccess, showError } = useToast();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Naturamore',
        price: '',
        imageUrl: '',
        youtubeUrl: '',
        resultDescription: ''
    });

    const products = productsData?.products || productsData?.data || [];

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
            const matchesActive = product.isActive !== false; // Only show active
            return matchesSearch && matchesCategory && matchesActive;
        });
    }, [products, searchTerm, categoryFilter]);

    // Handle Modal
    useEffect(() => {
        const handleOpenModal = () => openAddModal();
        window.addEventListener('openProductModal', handleOpenModal);
        return () => window.removeEventListener('openProductModal', handleOpenModal);
    }, []);

    const openAddModal = () => {
        setIsEditMode(false);
        setFormData({ title: '', description: '', category: 'Naturamore', price: '', imageUrl: '', youtubeUrl: '', resultDescription: '' });
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product, e) => {
        e.stopPropagation();
        setIsEditMode(true);
        setCurrentProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl || '',
            youtubeUrl: product.youtubeUrl || '',
            resultDescription: product.resultDescription || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateProduct({ id: currentProduct._id, ...formData }).unwrap();
                showSuccess('Product updated successfully');
            } else {
                await createProduct(formData).unwrap();
                showSuccess('Product created successfully');
            }
            closeModal();
        } catch (error) {
            console.error('Failed to save product:', error);
            showError('Error saving product');
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    };

    const handleDeleteClick = (id, e) => {
        e.stopPropagation();
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                await deleteProduct(productToDelete).unwrap();
                showSuccess('Product deleted successfully');
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            } catch (error) {
                console.error('Failed to delete product:', error);
                showError('Error deleting product');
            }
        }
    };

    return (
        <div className="reviews-page">
            {/* Search Bar and Filters */}
            <div className="filters-section">
                <div className={`search-box ${isSearchFocused ? 'search-focused' : ''}`}>
                    <input
                        type="text"
                        placeholder="Search products by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="search-input"
                    />
                </div>
                <div className={`filter-actions ${isSearchFocused ? 'hide-on-mobile' : ''}`}>
                    <button 
                        className="filter-toggle-btn"
                        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                    >
                        <MdFilterList /> <span>Filter by Category</span>
                    </button>
                </div>
            </div>
                    
            {isFilterPanelOpen && (
                <div className="filter-panel">
                    <div className="filter-panel-header">
                        <h3>Filters</h3>
                        <button 
                            className="clear-filters-btn"
                            onClick={() => setCategoryFilter('all')}
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="filter-panel-content">
                        <div className="filter-item">
                            <label>Category</label>
                            <select 
                                value={categoryFilter} 
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="table-container">
                {isLoading ? (
                    <TableSkeleton rows={8} cols={5} />
                ) : filteredProducts.length === 0 ? (
                    <div className="empty-state">
                        <p>No products found</p>
                    </div>
                ) : (
                    <div className="table-scroll-wrapper">
                        <table className="data-table">
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="clickable-row">
                                    <td>
                                        <img 
                                            src={product.imageUrl || 'https://via.placeholder.com/50?text=No+Image'} 
                                            alt={product.title} 
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=No+Image'; e.target.onerror = null; }}
                                            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td className="company-name-cell">
                                        <strong>{product.title}</strong>
                                    </td>
                                    <td>
                                        <span className="stats-badge total-badge">{product.category}</span>
                                    </td>
                                    <td>₹{product.price}</td>
                                    <td className="custom-url-cell" onClick={(e) => e.stopPropagation()}>
                                        <div className="custom-url-actions">
                                            <button className="action-btn edit-btn" onClick={(e) => openEditModal(product, e)}>
                                                <MdEdit /> Edit
                                            </button>
                                            <button className="action-btn delete-btn" onClick={(e) => handleDeleteClick(product._id, e)}>
                                                <MdDelete /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Drawer */}
            {isModalOpen && (
                <div className="drawer-overlay" onClick={closeModal}>
                    <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                        <div className="drawer-header">
                            <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                            <button className="drawer-close-btn" onClick={closeModal}>
                                <MdClose />
                            </button>
                        </div>
                        
                        <div className="drawer-body">
                            <form id="productForm" onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="drawer-form">
                                
                                <div className="form-section">
                                    <h3 className="section-title">Basic Information</h3>
                                    
                                    <div className="modal-field">
                                        <label>Product Title <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            required
                                            className="custom-input"
                                            placeholder="Enter product name"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="modal-field">
                                            <label>Category <span className="required">*</span></label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                className="custom-input"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="modal-field">
                                            <label>Price (₹) <span className="required">*</span></label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                                required
                                                className="custom-input"
                                                placeholder="e.g. 1500"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="modal-field">
                                        <label>Description <span className="required">*</span></label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            required
                                            className="custom-input"
                                            style={{minHeight: '120px', resize: 'vertical'}}
                                            placeholder="Detailed description of the product..."
                                        />
                                    </div>
                                </div>

                                <div className="section-divider"></div>

                                <div className="form-section">
                                    <h3 className="section-title">Media & Results</h3>
                                    
                                    <div className="modal-field">
                                        <label>Image URL <span className="required">*</span></label>
                                        <input
                                            type="url"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                            required
                                            className="custom-input"
                                            placeholder="https://..."
                                        />
                                        {formData.imageUrl && (
                                            <div className="image-preview">
                                                <img src={formData.imageUrl} alt="Preview" onError={(e) => e.target.style.display='none'} />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="modal-field">
                                        <label>YouTube Results Video URL</label>
                                        <input
                                            type="url"
                                            value={formData.youtubeUrl}
                                            onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                                            placeholder="https://youtube.com/watch?v=..."
                                            className="custom-input"
                                        />
                                    </div>
                                    
                                    <div className="modal-field">
                                        <label>Result Description</label>
                                        <textarea
                                            value={formData.resultDescription}
                                            onChange={(e) => setFormData({...formData, resultDescription: e.target.value})}
                                            placeholder="Describe the product results..."
                                            className="custom-input"
                                            style={{minHeight: '80px', resize: 'vertical'}}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="drawer-footer">
                            <ShimmerButton variant="secondary" onClick={closeModal} type="button">
                                Cancel
                            </ShimmerButton>
                            <ShimmerButton variant="primary" type="submit" form="productForm">
                                {isEditMode ? 'Update Product' : 'Save Product'}
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isDanger={true}
            />
        </div>
    );
};

export default Products;
