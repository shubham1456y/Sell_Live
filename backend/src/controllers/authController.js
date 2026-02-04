const { z } = require('zod');
const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

// Zod Schemas
const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        fullName: z.string().min(2),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

exports.schemas = {
    register: registerSchema,
    login: loginSchema,
};

exports.register = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
        status: 'success',
        token,
        data: { user },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.login(req.body);

    res.status(200).json({
        status: 'success',
        token,
        data: { user },
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    // Access user from req.user (middleware)
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
});
