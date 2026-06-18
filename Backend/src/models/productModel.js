import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Naturamore', 'Biofit', 'Herbs & More', 'Clean & More', 'Rang Dé']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    youtubeUrl: {
        type: String,
        default: ''
    },
    resultDescription: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        default: null
    }
}, {
    timestamps: true
});

productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
