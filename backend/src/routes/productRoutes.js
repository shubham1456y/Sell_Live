const express = require('express');
const productController = require('../controllers/productController');
const validate = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

// Protected Routes
router.use(authMiddleware.protect);

router.post(
    '/',
    validate(productController.schemas.createProduct),
    productController.createProduct
);

router.post(
    '/:id/variants',
    validate(productController.schemas.createVariant),
    productController.addVariant
);

module.exports = router;
