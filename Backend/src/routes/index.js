import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import themeRoutes from './themeRoutes.js';
import publicRoutes from './publicRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/themes', themeRoutes);
router.use('/public', publicRoutes);

export default router;
