const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        contactInfo: { 
            name: { type: String, default: "" },
            phone: { type: String, default: "" }
        },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
            }
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, default: "Pending" }, // e.g., Pending, Completed, Canceled
        orderType: { type: String, required: true, default : "in-store" }, // e.g., "online" or "in-store"
        tableNumber: { type: Number, default: null }, // Table number for in-store orders
       
        note: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", OrderSchema);
