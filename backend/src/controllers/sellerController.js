const { z } = require('zod');
const sellerService = require('../services/sellerService');
const catchAsync = require('../utils/catchAsync');

// Validation Schemas
const onboardSchema = z.object({
    body: z.object({
        storeName: z.string().min(3).max(50),
        description: z.string().optional(),
        logoUrl: z.string().url().optional(),
        applicationData: z.record(z.any()).optional(),
    }),
});

const updateSchema = z.object({
    body: z.object({
        description: z.string().optional(),
        logoUrl: z.string().url().optional(),
        returnAddress: z.object({
            street: z.string(),
            city: z.string(),
            zip: z.string(),
        }).optional(),
        platformsSoldOn: z.array(z.string()).optional(),
    }),
});

exports.schemas = {
    onboard: onboardSchema,
    update: updateSchema,
};

// Handlers
exports.onboard = catchAsync(async (req, res, next) => {
    const seller = await sellerService.onboardSeller(req.user.id, req.body);
    res.status(201).json({
        status: 'success',
        data: { seller },
    });
});

exports.getProfile = catchAsync(async (req, res, next) => {
    const seller = await sellerService.getSellerProfile(req.params.id);
    res.status(200).json({
        status: 'success',
        data: { seller },
    });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
    // Assuming route is /sellers/me or /sellers/:id, let's use user's seller profile logic strictly?
    // For now, simpler to rely on checking db ownership in service.
    // We'll trust the ID passed in params if checking other's profile, but for update we usually do /me or verify ID.
    // Let's implement /me style update or require ID. logic in service checks ownership.

    // Actually, standard REST is PATCH /sellers/:id. Service checks if req.user.id owns it.
    const seller = await sellerService.updateSellerProfile(req.params.id, req.user.id, req.body);
    res.status(200).json({
        status: 'success',
        data: { seller },
    });
});
