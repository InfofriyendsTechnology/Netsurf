import React from 'react';
import './RainbowButton.scss';

const RainbowButton = ({ 
    children, 
    onClick,
    disabled = false,
    icon: Icon,
    className = '',
    ...props 
}) => {
    return (
        <button 
            className={`rainbow-button ${className} ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            <span className="rainbow-button-content">
                {Icon && <Icon className="button-icon" />}
                {children}
            </span>
        </button>
    );
};

export default RainbowButton;
