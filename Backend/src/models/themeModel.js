import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'default',
        unique: true
    },
    bgColor: {
        type: String,
        default: '#ffffff',
        trim: true
    },
    textColor: {
        type: String,
        default: '#000000',
        trim: true
    },
    borderColor: {
        type: String,
        default: '#000000',
        trim: true
    },
    accentColor: {
        type: String,
        default: '#000000',
        trim: true
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        default: null
    }
}, {
    timestamps: true
});

const Theme = mongoose.model('Theme', themeSchema);

export default Theme;
