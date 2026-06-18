import Joi from 'joi';
import Theme from '../../models/themeModel.js';
import validator from '../../utils/validator.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: validator({
        body: Joi.object({
            bgColor: Joi.string().trim(),
            textColor: Joi.string().trim(),
            borderColor: Joi.string().trim(),
            accentColor: Joi.string().trim()
        })
    }),
    handler: async (req, res) => {
        try {
            const { bgColor, textColor, borderColor, accentColor } = req.body;

            const theme = await Theme.findOneAndUpdate(
                { name: 'default' },
                {
                    bgColor,
                    textColor,
                    borderColor,
                    accentColor,
                    updated_by: req.user?.id || null
                },
                { new: true, upsert: true, runValidators: true }
            );

            return responseHandler.success(res, 'Theme updated successfully', theme);
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
