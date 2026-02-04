const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/register',
    validate(authController.schemas.register),
    authController.register
);

router.post(
    '/login',
    validate(authController.schemas.login),
    authController.login
);

router.get('/me', authMiddleware.protect, authController.getMe);

module.exports = router;
