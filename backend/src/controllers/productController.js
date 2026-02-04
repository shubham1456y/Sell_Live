const { z } = require('zod');
const productService = require('../services/productService');
const catchAsync = require('../utils/catchAsync');

const createProductSchema = z.object({
    body: z.object({
        categoryId: z.string().uuid(),
        shippingProfileId: z.string().uuid(),
        title: z.string().min(3),
        description: z.string().optional(),
        basePrice: z.number().positive(),
        status: z.enum(['draft', 'active']).optional(),
        images: z.array(z.string().url()).optional(),
    }),
});

const createVariantSchema = z.object({
    body: z.object({
        sku: z.string(),
        title: z.string().optional(),
        options: z.record(z.any()),
        price: z.number().positive(),
        quantity: z.number().int().nonnegative(),
    }),
});

exports.schemas = {
    createProduct: createProductSchema,
    createVariant: createVariantSchema,
};

exports.createProduct = catchAsync(async (req, res, next) => {
    const product = await productService.createProduct(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: { product } });
});

exports.getOne = catchAsync(async (req, res, next) => {
    const product = await productService.getProductDetails(req.params.id);
    res.status(200).json({ status: 'success', data: { product } });
});

exports.getAll = catchAsync(async (req, res, next) => {
    const products = await productService.listProducts(req.query);
    res.status(200).json({ status: 'success', results: products.length, data: { products } });
});

exports.addVariant = catchAsync(async (req, res, next) => {
    const variant = await productService.addVariant(req.user.id, req.params.id, req.body);
    res.status(201).json({ status: 'success', data: { variant } });
});
