// routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route files
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const productRoutes = require('./product');
const reviewRoutes = require('./review');
const userRoutes = require('./user');

router.use('/category', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/review', reviewRoutes);

module.exports = router;