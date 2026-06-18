import Theme from '../../models/themeModel.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: (req, res, next) => next(),
    handler: async (req, res) => {
        try {
            let theme = await Theme.findOne({ name: 'default' });

            if (!theme) {
                theme = await Theme.create({ name: 'default' });
            }

            return responseHandler.success(res, 'Theme fetched successfully', theme);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
