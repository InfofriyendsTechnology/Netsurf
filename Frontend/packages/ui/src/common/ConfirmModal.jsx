import ShimmerButton from './ShimmerButton';
import './ConfirmModal.scss';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', isLoading = false, isDanger = false }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay" onClick={onClose}>
            <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="confirm-modal-body">
                    <p>{message}</p>
                </div>
                <div className="confirm-modal-actions">
                    <ShimmerButton
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </ShimmerButton>
                    <ShimmerButton
                        type="button"
                        onClick={onConfirm}
                        variant={isDanger ? 'danger' : 'primary'}
                        isLoading={isLoading}
                        loadingText="Processing..."
                    >
                        {confirmText}
                    </ShimmerButton>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
