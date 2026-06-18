import { MdPalette, MdLink } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './Settings.scss';

const Settings = () => {
    useDocumentTitle('Settings');

    const settingsCards = [
        {
            title: 'Appearance',
            description: 'Change theme colors, dark/light mode, and accent colors',
            icon: MdPalette,
            link: '/theme',
            color: '#8b5cf6'
        },
        {
            title: 'Public Catalog',
            description: 'View your public product catalog page',
            icon: MdLink,
            link: '/catalog',
            color: '#3b82f6',
            external: true
        }
    ];

    return (
        <div className="settings-page">
            <div className="settings-grid">
                {settingsCards.map((card) => {
                    const Icon = card.icon;
                    const CardWrapper = card.external ? 'a' : Link;
                    const props = card.external 
                        ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' }
                        : { to: card.link };

                    return (
                        <CardWrapper key={card.title} className="settings-card" {...props}>
                            <div className="settings-card-icon" style={{ color: card.color }}>
                                <Icon />
                            </div>
                            <div className="settings-card-info">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                            <span className="settings-card-arrow">→</span>
                        </CardWrapper>
                    );
                })}
            </div>
        </div>
    );
};

export default Settings;
