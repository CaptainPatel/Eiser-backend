const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: {
                type: String,
                required: true,
                trim: true,
                minLength: 3
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ]
})

const Cart = mongoose.model("cart", cartSchema)

module.exports = Cart;