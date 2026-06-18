import { useState } from 'react';
import { iconCategories, getIconComponent } from '../../utils/iconMapping';
import './IconPicker.scss';

const IconPicker = ({ selectedIcon, onSelectIcon, onClose }) => {
    const [activeCategory, setActiveCategory] = useState('Social Media');
    const [searchQuery, setSearchQuery] = useState('');

    const handleIconSelect = (iconName) => {
        onSelectIcon(iconName);
        onClose();
    };

    // Filter icons based on search query
    const getFilteredIcons = () => {
        if (!searchQuery) {
            return iconCategories[activeCategory] || [];
        }

        const allIcons = Object.values(iconCategories).flat();
        return allIcons.filter(icon =>
            icon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredIcons = getFilteredIcons();

    return (
        <div className="icon-picker-overlay" onClick={onClose}>
            <div className="icon-picker-modal" onClick={(e) => e.stopPropagation()}>
                <div className="icon-picker-header">
                    <h3>Select Icon</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="icon-picker-search">
                    <input
                        type="text"
                        placeholder="Search icons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                {!searchQuery && (
                    <div className="icon-picker-categories">
                        {Object.keys(iconCategories).map((category) => (
                            <button
                                key={category}
                                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                <div className="icon-picker-grid">
                    {filteredIcons.length > 0 ? (
                        filteredIcons.map((iconData) => {
                            const IconComponent = getIconComponent(iconData.icon);
                            return (
                                <button
                                    key={iconData.icon}
                                    className={`icon-option ${selectedIcon === iconData.icon ? 'selected' : ''}`}
                                    onClick={() => handleIconSelect(iconData.icon)}
                                    title={iconData.name}
                                >
                                    <IconComponent size={24} />
                                    <span className="icon-name">{iconData.name}</span>
                                </button>
                            );
                        })
                    ) : (
                        <div className="no-results">No icons found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IconPicker;
