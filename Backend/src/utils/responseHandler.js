const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    VALIDATION_ERROR: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};

const responseHandler = {
    success: (res, message, data = null) => {
        const response = { success: true, message };
        if (data !== null) response.data = data;
        return res.status(HTTP_STATUS.OK).json(response);
    },

    created: (res, message, data = null) => {
        const response = { success: true, message };
        if (data !== null) response.data = data;
        return res.status(HTTP_STATUS.CREATED).json(response);
    },

    error: (res, message = "Something went wrong", statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
        return res.status(statusCode).json({ success: false, message });
    },

    badRequest: (res, message = "Bad request") => {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message });
    },

    unauthorized: (res, message = "Unauthorized") => {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message });
    },

    forbidden: (res, message = "Forbidden") => {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ success: false, message });
    },

    notFound: (res, message = "Not found") => {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message });
    },

    conflict: (res, message = "Conflict") => {
        return res.status(HTTP_STATUS.CONFLICT).json({ success: false, message });
    },

    validationError: (res, message = "Validation error") => {
        return res.status(HTTP_STATUS.VALIDATION_ERROR).json({ success: false, message });
    },

    tooManyRequests: (res, message = "Too many requests") => {
        return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({ success: false, message });
    },

    internalServerError: (res, message = "Internal server error") => {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message });
    },

    serviceUnavailable: (res, message = "Service unavailable") => {
        return res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({ success: false, message });
    }
};

export default responseHandler;
