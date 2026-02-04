const Seller = require('../models/sellerModel');
const AppError = require('../utils/AppError');

exports.onboardSeller = async (userId, data) => {
    // 1. Check if user is already a seller
    const existingSeller = await Seller.findByUserId(userId);
    if (existingSeller) {
        throw new AppError('User is already a seller', 400);
    }

    // 2. Create seller profile
    const newSeller = await Seller.create({
        userId,
        ...data
    });

    return newSeller;
};

exports.getSellerProfile = async (sellerId) => {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
        throw new AppError('Seller not found', 404);
    }
    return seller;
};

exports.updateSellerProfile = async (sellerId, userId, data) => {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
        throw new AppError('Seller not found', 404);
    }

    // Authorization check: Ensure the user owns this seller profile
    if (seller.user_id !== userId) {
        throw new AppError('Not authorized to update this shop', 403);
    }

    const updatedSeller = await Seller.update(sellerId, data);
    return updatedSeller;
};
