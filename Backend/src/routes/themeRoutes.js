import { Router } from 'express';
import { getTheme, updateTheme } from '../controllers/themeController/index.js';

const router = Router();

router.get('/', getTheme.validator, getTheme.handler);
router.put('/', updateTheme.validator, updateTheme.handler);

export default router;
