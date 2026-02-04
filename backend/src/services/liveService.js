const Stream = require('../models/streamModel');
const Seller = require('../models/sellerModel');
const Product = require('../models/productModel');
const AppError = require('../utils/AppError');

exports.scheduleStream = async (userId, data) => {
    const seller = await Seller.findByUserId(userId);
    if (!seller) throw new AppError('Seller profile not found', 404);

    return await Stream.create({
        sellerId: seller.id,
        ...data
    });
};

exports.startStream = async (userId, streamId) => {
    const seller = await Seller.findByUserId(userId);
    const stream = await Stream.findById(streamId);

    if (!stream) throw new AppError('Stream not found', 404);
    if (stream.seller_id !== seller.id) throw new AppError('Not authorized', 403);
    if (stream.status !== 'scheduled') throw new AppError('Stream is not in scheduled state', 400);

    return await Stream.updateStatus(streamId, 'live', 'started_at');
};

exports.endStream = async (userId, streamId) => {
    const seller = await Seller.findByUserId(userId);
    const stream = await Stream.findById(streamId);

    if (!stream) throw new AppError('Stream not found', 404);
    if (stream.seller_id !== seller.id) throw new AppError('Not authorized', 403);

    return await Stream.updateStatus(streamId, 'ended', 'ended_at');
};

exports.setActiveProduct = async (userId, streamId, productId) => {
    const seller = await Seller.findByUserId(userId);
    const stream = await Stream.findById(streamId);

    if (!stream) throw new AppError('Stream not found', 404);
    if (stream.seller_id !== seller.id) throw new AppError('Not authorized', 403);
    if (stream.status !== 'live') throw new AppError('Stream is not live', 400);

    // Verify product belongs to seller
    const product = await Product.findById(productId);
    if (!product || product.seller_id !== seller.id) {
        throw new AppError('Product invalid or not owned by seller', 400);
    }

    return await Stream.setActiveProduct(streamId, productId);
};

exports.getLiveStreams = async () => {
    return await Stream.listLive({});
};
