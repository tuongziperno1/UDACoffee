const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

// Định nghĩa các routes cho Review
router.get('/', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getReviewById);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
