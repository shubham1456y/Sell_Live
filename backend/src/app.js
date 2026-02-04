const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pinoHttp = require('pino-http');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Logging
app.use(pinoHttp({ logger }));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Implement CORS
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 2) ROUTES
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Live Stream Shopping API',
        version: '1.0.0'
    });
});

// Import Routes
const authRouter = require('./routes/authRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const productRouter = require('./routes/productRoutes');
const liveRouter = require('./routes/liveRoutes');

// Mount Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/sellers', sellerRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/streams', liveRouter);

// 3) UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
