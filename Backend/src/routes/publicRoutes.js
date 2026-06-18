import { Router } from 'express';
import Product from '../models/productModel.js';
import responseHandler from '../utils/responseHandler.js';

const router = Router();

// GET all active products (public, no auth)
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
        return responseHandler.success(res, 'Products fetched successfully', products);
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
});

// GET single product by ID (public, no auth)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || !product.isActive) {
            return responseHandler.notFound(res, 'Product not found');
        }
        return responseHandler.success(res, 'Product fetched successfully', product);
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
});

export default router;
