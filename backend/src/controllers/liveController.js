const { z } = require('zod');
const liveService = require('../services/liveService');
const catchAsync = require('../utils/catchAsync');

const scheduleSchema = z.object({
    body: z.object({
        title: z.string().min(5),
        scheduledAt: z.string().datetime(), // ISO 8601
    }),
});

const activeProductSchema = z.object({
    body: z.object({
        productId: z.string().uuid(),
    }),
});

exports.schemas = {
    schedule: scheduleSchema,
    activeProduct: activeProductSchema,
};

exports.schedule = catchAsync(async (req, res, next) => {
    const stream = await liveService.scheduleStream(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: { stream } });
});

exports.start = catchAsync(async (req, res, next) => {
    const stream = await liveService.startStream(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data: { stream } });
});

exports.end = catchAsync(async (req, res, next) => {
    const stream = await liveService.endStream(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data: { stream } });
});

exports.setActiveProduct = catchAsync(async (req, res, next) => {
    const stream = await liveService.setActiveProduct(req.user.id, req.params.id, req.body.productId);
    res.status(200).json({ status: 'success', data: { stream } });
});

exports.listLive = catchAsync(async (req, res, next) => {
    const streams = await liveService.getLiveStreams();
    res.status(200).json({ status: 'success', results: streams.length, data: { streams } });
});
