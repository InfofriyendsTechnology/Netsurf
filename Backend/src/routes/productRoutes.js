import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController/index.js';

const router = Router();

router.get('/', getAllProducts.validator, getAllProducts.handler);
router.get('/:id', getProductById.validator, getProductById.handler);
router.post('/', createProduct.validator, createProduct.handler);
router.put('/:id', updateProduct.validator, updateProduct.handler);
router.delete('/:id', deleteProduct.validator, deleteProduct.handler);

export default router;
