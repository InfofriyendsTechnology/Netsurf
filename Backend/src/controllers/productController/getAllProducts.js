import Product from '../../models/productModel.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: (req, res, next) => next(),
    handler: async (req, res) => {
        try {
            const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });

            return responseHandler.success(res, 'Products fetched successfully', products);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
