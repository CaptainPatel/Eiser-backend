const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 100,
    },
    category: {
        type: String,
        required: true,
        enum: ["clothing", "accessories", "watches"]
    }
})

const Product = mongoose.model("product", productSchema);

module.exports = Product; 