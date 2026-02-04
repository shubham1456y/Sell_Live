const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.register = async ({ email, password, fullName }) => {
    // 1) Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new AppError('Email already in use', 400);
    }

    // 2) Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // 3) Create user
    const newUser = await User.create({
        email,
        passwordHash,
        fullName,
    });

    // 4) Generate Token
    const token = signToken(newUser.id);

    return { user: newUser, token };
};

exports.login = async ({ email, password }) => {
    // 1) Check if email and password exist
    if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
    }

    // 2) Check if user exists & password is correct
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new AppError('Incorrect email or password', 401);
    }

    // 3) Generate Token
    const token = signToken(user.id);

    // Remove password from output
    delete user.password_hash;

    return { user, token };
};
