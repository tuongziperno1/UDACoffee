const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        stock: { type: Number, default: 0 },
        imageUrl: { type: [String], default: [] },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", ProductSchema);