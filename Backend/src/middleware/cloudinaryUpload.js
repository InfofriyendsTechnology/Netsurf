import multer from 'multer';
import sharp from 'sharp';
import cloudinary from '../config/cloudinary.js';
import responseHandler from '../utils/responseHandler.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadSingleImage = (fieldName = 'image') => {
    return [
        upload.single(fieldName),
        async (req, res, next) => {
            try {
                if (!req.file) {
                    return next();
                }

                const optimizedBuffer = await sharp(req.file.buffer)
                    .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toBuffer();

                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'netsurf/products',
                            resource_type: 'image',
                            format: 'webp'
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(optimizedBuffer);
                });

                req.body.imageUrl = result.secure_url;
                next();
            } catch (error) {
                return responseHandler.error(res, error?.message);
            }
        }
    ];
};

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return;
        const parts = imageUrl.split('/');
        const folderAndFile = parts.slice(parts.indexOf('netsurf')).join('/');
        const publicId = folderAndFile.replace(/\.[^/.]+$/, '');
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error.message);
    }
};

export { uploadSingleImage, deleteFromCloudinary };
