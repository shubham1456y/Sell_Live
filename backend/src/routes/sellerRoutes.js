const express = require('express');
const sellerController = require('../controllers/sellerController');
const validate = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public
router.get('/:id', sellerController.getProfile);

// Protected
router.use(authMiddleware.protect);

router.post(
    '/onboard',
    validate(sellerController.schemas.onboard),
    sellerController.onboard
);

router.patch(
    '/:id',
    validate(sellerController.schemas.update),
    sellerController.updateProfile
);

module.exports = router;
