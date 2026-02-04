const Product = require('../models/productModel');
const ProductVariant = require('../models/productVariantModel');
const Seller = require('../models/sellerModel');
const AppError = require('../utils/AppError');

exports.createProduct = async (userId, data) => {
    // 1. Verify User is a Seller
    const seller = await Seller.findByUserId(userId);
    if (!seller) throw new AppError('User is not a seller', 403);

    // 2. Create Product (Transaction ideally)
    const product = await Product.create({
        sellerId: seller.id,
        ...data
    });

    return product;
};

exports.getProductDetails = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new AppError('Product not found', 404);

    const variants = await ProductVariant.findByProductId(id);
    return { ...product, variants };
};

exports.listProducts = async (filters) => {
    return await Product.findAll(filters);
};

exports.addVariant = async (userId, productId, data) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError('Product not found', 404);

    const seller = await Seller.findByUserId(userId);
    if (!seller || seller.id !== product.seller_id) {
        throw new AppError('Not authorized', 403);
    }

    return await ProductVariant.create({
        productId,
        ...data
    });
};
