import { useState, useEffect } from 'react';
import { getIconComponent } from '../../utils/iconMapping';
import IconPicker from './IconPicker';
import { useUploadCustomIconMutation } from '../../services/portfolioApi';
import { useToast } from '@netsurf/ui/common/useToast';
import './LinkEditor.scss';

const LinkEditor = ({ link, onSave, onCancel, companyId }) => {
    const [formData, setFormData] = useState({
        iconType: 'default',
        iconName: 'FaLink',
        customIconUrl: null,
        linkName: '',
        linkUrl: '',
        order: 0,
        isVisible: true
    });

    const [showIconPicker, setShowIconPicker] = useState(false);
    const [uploadCustomIcon, { isLoading: isUploading }] = useUploadCustomIconMutation();
    const { showSuccess, showError, showWarning } = useToast();

    useEffect(() => {
        if (link) {
            setFormData({
                ...link,
                iconType: link.iconType || 'default',
                iconName: link.iconName || 'FaLink',
                customIconUrl: link.customIconUrl || null
            });
        }
    }, [link]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleIconSelect = (iconName) => {
        setFormData(prev => ({
            ...prev,
            iconType: 'default',
            iconName,
            customIconUrl: null
        }));
    };

    const handleCustomIconUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !companyId) return;

        try {
            const formDataObj = new FormData();
            formDataObj.append('icon', file);

            const result = await uploadCustomIcon({ 
                companyId, 
                formData: formDataObj 
            }).unwrap();

            setFormData(prev => ({
                ...prev,
                iconType: 'uploaded',
                customIconUrl: result.data.iconUrl
            }));
            showSuccess('Icon uploaded successfully');
        } catch (error) {
            console.error('Error uploading icon:', error);
            showError('Failed to upload icon');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.linkName.trim() || !formData.linkUrl.trim()) {
            showWarning('Link name and URL are required');
            return;
        }

        onSave({
            ...formData,
            _id: link?._id
        });
    };

    const IconComponent = getIconComponent(formData.iconName);

    return (
        <div className="link-editor-overlay" onClick={onCancel}>
            <div className="link-editor-modal" onClick={(e) => e.stopPropagation()}>
                <div className="link-editor-header">
                    <h3>{link ? 'Edit Link' : 'Add New Link'}</h3>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>

                <form className="link-editor-form" onSubmit={handleSubmit}>
                    <div className="form-section icon-section">
                        <label>Icon</label>
                        <div className="icon-options">
                            <div className="current-icon">
                                {formData.iconType === 'uploaded' && formData.customIconUrl ? (
                                    <div className="custom-icon-preview">
                                        <img src={formData.customIconUrl} alt="Custom icon" />
                                    </div>
                                ) : (
                                    <div className="default-icon-preview">
                                        <IconComponent size={32} />
                                    </div>
                                )}
                            </div>

                            <div className="icon-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setShowIconPicker(true)}
                                >
                                    Choose Icon
                                </button>

                                <label className="btn-secondary upload-btn">
                                    {isUploading ? 'Uploading...' : 'Upload Custom'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCustomIconUpload}
                                        disabled={isUploading || !companyId}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <label htmlFor="linkName">Link Name *</label>
                        <input
                            type="text"
                            id="linkName"
                            name="linkName"
                            value={formData.linkName}
                            onChange={handleInputChange}
                            placeholder="e.g., Instagram, Website, Phone"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="linkUrl">Link URL *</label>
                        <input
                            type="url"
                            id="linkUrl"
                            name="linkUrl"
                            value={formData.linkUrl}
                            onChange={handleInputChange}
                            placeholder="e.g., https://instagram.com/yourprofile"
                            required
                        />
                    </div>

                    <div className="form-section checkbox-section">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isVisible"
                                checked={formData.isVisible}
                                onChange={handleInputChange}
                            />
                            <span>Visible on portfolio</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            {link ? 'Update Link' : 'Add Link'}
                        </button>
                    </div>
                </form>
            </div>

            {showIconPicker && (
                <IconPicker
                    selectedIcon={formData.iconName}
                    onSelectIcon={handleIconSelect}
                    onClose={() => setShowIconPicker(false)}
                />
            )}
        </div>
    );
};

export default LinkEditor;
