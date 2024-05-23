const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Định nghĩa các routes cho User
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;