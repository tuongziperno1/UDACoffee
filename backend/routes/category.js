const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// Định nghĩa các routes cho Category
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
