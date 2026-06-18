import Joi from 'joi';
import Product from '../../models/productModel.js';
import validator from '../../utils/validator.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            title: Joi.string().trim(),
            description: Joi.string(),
            category: Joi.string().valid('Naturamore', 'Biofit', 'Herbs & More', 'Clean & More', 'Rang Dé'),
            price: Joi.number().min(0),
            imageUrl: Joi.string(),
            youtubeUrl: Joi.string().uri().allow('').optional(),
            resultDescription: Joi.string().allow('').optional(),
            isActive: Joi.boolean()
        })
    }),
    handler: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!product) {
                return responseHandler.notFound(res, 'Product not found');
            }

            return responseHandler.success(res, 'Product updated successfully', product);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
