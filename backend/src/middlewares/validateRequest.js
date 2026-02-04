const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { ZodError } = require('zod');

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            const errorMessages = err.errors.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            // 400 Bad Request for validation errors
            return next(new AppError('Validation Error', 400));
        }
        next(err);
    }
};

module.exports = validate;
