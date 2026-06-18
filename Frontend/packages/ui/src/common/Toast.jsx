import { useEffect } from 'react';
import { MdCheckCircle, MdError, MdInfo, MdWarning, MdClose } from 'react-icons/md';
import './Toast.scss';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <MdCheckCircle />;
            case 'error':
                return <MdError />;
            case 'warning':
                return <MdWarning />;
            default:
                return <MdInfo />;
        }
    };

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-icon">{getIcon()}</div>
            <div className="toast-message">{message}</div>
            <button className="toast-close" onClick={onClose}>
                <MdClose />
            </button>
        </div>
    );
};

export default Toast;
