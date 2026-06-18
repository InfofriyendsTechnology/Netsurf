import { getIconComponent } from '../../utils/iconMapping';
import { FiEye, FiEyeOff, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './LinkCard.scss';

const LinkCard = ({ link, onClick, showEditButtons = false, onEdit, onDelete, onToggleVisibility }) => {
    const IconComponent = getIconComponent(link.iconName);

    const handleClick = () => {
        if (onClick) {
            onClick(link);
        } else if (link.linkUrl) {
            window.open(link.linkUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const getIconDisplay = () => {
        if (link.iconType === 'uploaded' && link.customIconUrl) {
            return (
                <div className="custom-icon">
                    <img src={link.customIconUrl} alt={link.linkName} />
                </div>
            );
        }
        return <IconComponent size={28} />;
    };

    return (
        <div className={`link-card ${!link.isVisible ? 'hidden' : ''}`}>
            <div className="link-card-content" onClick={handleClick}>
                <div className="link-icon">
                    {getIconDisplay()}
                </div>
                <div className="link-details">
                    <h4 className="link-name">{link.linkName}</h4>
                    <p className="link-url">{link.linkUrl}</p>
                </div>
            </div>

            {showEditButtons && (
                <div className="link-actions">
                    <button 
                        className="action-btn visibility-btn" 
                        onClick={() => onToggleVisibility(link)}
                        title={link.isVisible ? 'Hide' : 'Show'}
                    >
                        {link.isVisible ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                    </button>
                    <button 
                        className="action-btn edit-btn" 
                        onClick={() => onEdit(link)}
                        title="Edit"
                    >
                        <FiEdit2 size={18} />
                    </button>
                    <button 
                        className="action-btn delete-btn" 
                        onClick={() => onDelete(link)}
                        title="Delete"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default LinkCard;
