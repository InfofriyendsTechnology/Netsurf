import Joi from 'joi';
import Product from '../../models/productModel.js';
import validator from '../../utils/validator.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return responseHandler.notFound(res, 'Product not found');
            }

            return responseHandler.success(res, 'Product fetched successfully', product);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
