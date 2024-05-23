const Review = require('../models/Review');
const Order = require('../models/Order');

// Controller cho Review
const ReviewController = {
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getReviewById: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createReview: async (req, res) => {
        const { user, product, rating, comment, orderId } = req.body;
        
        try {
            // Kiểm tra xem đơn hàng đã hoàn thành chưa
            const order = await Order.findById(orderId);
            if (!order || order.status !== 'Completed') {
                return res.status(400).json({ message: 'Cannot create review for an incomplete or non-existent order' });
            }

            // Tạo đánh giá
            const review = new Review({ user, product, rating, comment, order: orderId });
            const newReview = await review.save();
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateReview: async (req, res) => {
        try {
            const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedReview) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(updatedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteReview: async (req, res) => {
        try {
            const review = await Review.findByIdAndDelete(req.params.id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json({ message: 'Review deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ReviewController;
