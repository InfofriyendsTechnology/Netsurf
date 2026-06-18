import Joi from 'joi';
import Product from '../../models/productModel.js';
import validator from '../../utils/validator.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: validator({
        body: Joi.object({
            title: Joi.string().trim().required(),
            description: Joi.string().required(),
            category: Joi.string().valid('Naturamore', 'Biofit', 'Herbs & More', 'Clean & More', 'Rang Dé').required(),
            price: Joi.number().min(0).required(),
            imageUrl: Joi.string().required(),
            youtubeUrl: Joi.string().uri().allow('').optional(),
            resultDescription: Joi.string().allow('').optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { title, description, category, price, imageUrl, youtubeUrl, resultDescription } = req.body;

            const product = await Product.create({
                title,
                description,
                category,
                price,
                imageUrl,
                youtubeUrl,
                resultDescription,
                created_by: req.user?.id || null
            });

            return responseHandler.created(res, 'Product created successfully', product);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
