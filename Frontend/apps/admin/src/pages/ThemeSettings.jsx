import { useState, useEffect } from 'react';
import { MdPalette, MdCheck } from 'react-icons/md';
import { useUpdateThemeMutation, useGetThemeQuery } from '../services/themeApi';
import ShimmerButton from '@netsurf/ui/common/ShimmerButton';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useToast } from '@netsurf/ui/common/useToast';
import './ThemeSettings.scss';

const THEMES = [
    { id: 'champagne-gold', name: 'Champagne Gold', color: '#DFC2A4' },
    { id: 'amber-gold', name: 'Amber Gold', color: '#E6C78A' },
    { id: 'rose-gold', name: 'Rose Gold', color: '#E0B0A0' },
    { id: 'silver', name: 'Silver', color: '#C0C0C0' },
    { id: 'platinum', name: 'Platinum', color: '#E5E4E2' },
    { id: 'chrome', name: 'Chrome', color: '#D4D4D4' },
    { id: 'pearl-white', name: 'Pearl White', color: '#F5F5DC' },
    { id: 'sapphire-blue', name: 'Sapphire Blue', color: '#A8C5DD' },
    { id: 'steel-blue', name: 'Steel Blue', color: '#B0C4DE' },
    { id: 'azure-blue', name: 'Azure Blue', color: '#C8E0F0' },
    { id: 'navy-metallic', name: 'Navy Metallic', color: '#8FA4C0' },
    { id: 'amethyst', name: 'Amethyst', color: '#D4BBD8' },
    { id: 'lavender', name: 'Lavender', color: '#E6D5E8' },
    { id: 'plum', name: 'Plum', color: '#C9A8C7' },
    { id: 'blush-pink', name: 'Blush Pink', color: '#F5D5D8' },
    { id: 'dusty-rose', name: 'Dusty Rose', color: '#D8B5B8' },
    { id: 'mauve', name: 'Mauve', color: '#E0C5D8' },
    { id: 'burgundy', name: 'Burgundy', color: '#B89098' },
    { id: 'wine-red', name: 'Wine Red', color: '#C8A5A8' },
    { id: 'crimson', name: 'Crimson', color: '#D8A8AD' },
    { id: 'sage-green', name: 'Sage Green', color: '#C5D5C8' },
    { id: 'mint', name: 'Mint', color: '#D5E8DF' },
    { id: 'emerald', name: 'Emerald', color: '#A8C8B8' },
    { id: 'olive', name: 'Olive', color: '#C8C5A8' },
    { id: 'teal', name: 'Teal', color: '#A8C8C8' },
    { id: 'aquamarine', name: 'Aquamarine', color: '#C8E0E0' },
    { id: 'turquoise', name: 'Turquoise', color: '#B8D8D0' },
    { id: 'peach', name: 'Peach', color: '#F5D5C5' },
    { id: 'coral', name: 'Coral', color: '#E8C5B8' },
    { id: 'taupe', name: 'Taupe', color: '#C8B8B0' },
    { id: 'mocha', name: 'Mocha', color: '#D8C5B8' },
    { id: 'caramel', name: 'Caramel', color: '#E6D0B8' }
];

const ThemeSettings = () => {
    useDocumentTitle('Theme Settings');
    const { data: themeData } = useGetThemeQuery();
    const [updateTheme, { isLoading: isSaving }] = useUpdateThemeMutation();
    const { showSuccess, showError } = useToast();
    
    const [selectedTheme, setSelectedTheme] = useState('silver');

    useEffect(() => {
        const savedColor = localStorage.getItem('themeColor') || 'silver';
        setSelectedTheme(savedColor);
    }, []);

    const handleThemeSelect = (themeId) => {
        setSelectedTheme(themeId);
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('themeColor', themeId);
    };

    const handleSave = async () => {
        try {
            await updateTheme({ name: selectedTheme }).unwrap();
            showSuccess('Theme saved successfully!');
        } catch (error) {
            console.error('Failed to save theme', error);
            showError('Failed to save theme');
        }
    };

    return (
        <div className="theme-settings-page">
            <div className="welcome-section" style={{marginBottom: '30px', textAlign: 'left', padding: '30px'}}>
                <h2><MdPalette style={{marginRight: '10px'}} /> Appearance Settings</h2>
                <p>Customize the look and feel of your admin dashboard.</p>
            </div>

            <div className="theme-grid">
                {THEMES.map((theme) => (
                    <div 
                        key={theme.id}
                        className={`theme-card ${selectedTheme === theme.id ? 'active' : ''}`}
                        onClick={() => handleThemeSelect(theme.id)}
                    >
                        <div className="theme-color-preview" style={{ background: theme.color }}>
                            {selectedTheme === theme.id && <MdCheck className="check-icon" />}
                        </div>
                        <span className="theme-name">{theme.name}</span>
                    </div>
                ))}
            </div>

            <div className="save-action" style={{marginTop: '40px', display: 'flex', justifyContent: 'flex-end'}}>
                <ShimmerButton variant="primary" onClick={handleSave} isLoading={isSaving}>
                    Save Changes
                </ShimmerButton>
            </div>
        </div>
    );
};

export default ThemeSettings;
