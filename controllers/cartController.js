const Cart = require("../models/cartModel");

module.exports.getUserCart = async (req, res) => {
    try {
        let user = req.user;
        let cart = await Cart.findOne({ userid: user._id })
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports.deleteFromCart = async (req, res) => {
    try {
        let user = req.user;
        let productId = req.params.id;
        let cart = await Cart.findOne({ userid: user._id })
        let existingProduct = cart.products.findIndex(
            (product) => product.productId.toString() === productId.toString()
        );
        if (existingProduct !== -1) {
            cart.products.splice(existingProduct, 1);
            await cart.save();
        } else {
            console.log("already deleted");
            return res.status(200).json({
                success: true,
                message: "product already deleted",
                cart
            });
        }
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports.addToCart = async (req, res) => {
    console.log("adding...");
    try {
        let user = req.user;
        let productData = req.body;
        let cart = await Cart.findOne({ userid: user._id })
        let existingProduct = cart.products.findIndex(
            (product) => product.productId.toString() === productData.productId.toString()
        );
        if (existingProduct !== -1) {
            cart.products[existingProduct].qty = productData.qty;
            await cart.save();
        } else {
            cart.products.push(productData);
            cart.save();
        }
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}