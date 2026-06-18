import { MdClose } from 'react-icons/md';
import './ClearableInput.scss';

const ClearableInput = ({ value, onChange, onClear, className = '', ...props }) => {
    const handleClear = () => {
        if (onClear) {
            onClear();
        } else if (onChange) {
            // If onClear not provided, trigger onChange with empty value
            const event = {
                target: { 
                    name: props.name, 
                    value: '' 
                }
            };
            onChange(event);
        }
    };

    const showClearButton = value && value.toString().length > 0;

    return (
        <div className={`clearable-input-wrapper ${className}`}>
            <input
                {...props}
                value={value}
                onChange={onChange}
                className="clearable-input"
            />
            {showClearButton && (
                <button
                    type="button"
                    className="clear-input-btn"
                    onClick={handleClear}
                    tabIndex={-1}
                    aria-label="Clear input"
                >
                    <MdClose />
                </button>
            )}
        </div>
    );
};

export default ClearableInput;
