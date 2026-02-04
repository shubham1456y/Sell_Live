const express = require('express');
const liveController = require('../controllers/liveController');
const validate = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public
router.get('/live', liveController.listLive);

// Protected (Sellers)
router.use(authMiddleware.protect);

router.post(
    '/',
    validate(liveController.schemas.schedule),
    liveController.schedule
);

router.patch('/:id/start', liveController.start);
router.patch('/:id/end', liveController.end);

router.patch(
    '/:id/active-product',
    validate(liveController.schemas.activeProduct),
    liveController.setActiveProduct
);

module.exports = router;
