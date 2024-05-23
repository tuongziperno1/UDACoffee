const Order = require('../models/Order');
const Product = require('../models/Product');

// Controller cho Order
const OrderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('products.product').populate('user');
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate('products.product').populate('user');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createOrder: async (req, res) => {
        const { user, products, status, orderType, contactInfo } = req.body;
        const tableNumber = req.query.tableNumber; // Lấy tableNumber từ req.query
        try {
            // Tính toán totalPrice dựa trên products
            let totalPrice = 0;
            for (const item of products) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(400).json({ message: `Product with id ${item.product} not found` });
                }
                totalPrice += product.price * item.quantity;
            }

            // Tạo đơn hàng mới
            const order = new Order({ user, products, totalPrice, status, orderType, tableNumber, contactInfo });
            const newOrder = await order.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = OrderController;
