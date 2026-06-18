import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../../models/adminModel.js';
import { JWT_SECRET } from '../../config/config.js';
import validator from '../../utils/validator.js';
import responseHandler from '../../utils/responseHandler.js';

export default {
    validator: validator({
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if credentials match the .env super admin
            const envEmail = process.env.ADMIN_EMAIL;
            const envPassword = process.env.ADMIN_PASSWORD;

            if (envEmail && envPassword && email === envEmail && password === envPassword) {
                const token = jwt.sign(
                    { id: 'super-admin', email: envEmail, username: 'Super Admin' },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return responseHandler.success(res, 'Login successful', {
                    token,
                    user: {
                        id: 'super-admin',
                        username: 'Super Admin',
                        email: envEmail
                    }
                });
            }

            // Fallback to database check
            const admin = await Admin.findOne({ email, isActive: true });
            if (!admin) {
                return responseHandler.unauthorized(res, 'Invalid email or password');
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return responseHandler.unauthorized(res, 'Invalid email or password');
            }

            const token = jwt.sign(
                { id: admin._id, email: admin.email, username: admin.username },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            return responseHandler.success(res, 'Login successful', {
                token,
                user: {
                    id: admin._id,
                    username: admin.username,
                    email: admin.email
                }
            });
        } catch (error) {
            return responseHandler.error(res, error?.message);
        }
    }
};
