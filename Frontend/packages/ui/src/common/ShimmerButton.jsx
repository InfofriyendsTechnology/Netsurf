import React from 'react';
import './ShimmerButton.scss';

const ShimmerButton = ({ 
    children, 
    isLoading = false, 
    loadingText = 'Loading...', 
    variant = 'primary',
    icon: Icon,
    ...props 
}) => {
    return (
        <button 
            className={`shimmer-btn shimmer-btn-${variant} ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="shimmer-effect"></span>
                    <span className="btn-content">{loadingText}</span>
                </>
            ) : (
                <span className="btn-content">
                    {Icon && <Icon className="btn-icon" />}
                    {children}
                </span>
            )}
        </button>
    );
};

export default ShimmerButton;
