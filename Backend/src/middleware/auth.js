import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import responseHandler from '../utils/responseHandler.js';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return responseHandler.unauthorized(res, 'No token provided');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return responseHandler.unauthorized(res, 'Invalid or expired token');
    }
};

export default auth;
