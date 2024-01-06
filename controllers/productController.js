const Product = require("../models/productModel");

module.exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find();
        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports.getSingleProduct = async (req, res) => {
    try {
        let _id = req.params.id;
        let product = await Product.findById(_id)
        return res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


module.exports.createProduct = async (req, res) => {
    try {
        let data = req.body;
        let newProduct = await new Product(data).save();
        return res.status(201).json({
            success: true,
            message: "New product has been created!",
            newProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports.updateProduct = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = req.body;
        let updateProduct = await Product.findByIdAndUpdate(_id, data, { new: true });
        return res.status(201).json({
            success: true,
            message: "Product Updated Successfully",
            updateProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports.deleteProduct = async (req, res) => {
    console.log("");
    try {
        let _id = req.params.id;
        let deleteProduct = await Product.findByIdAndDelete(_id);
        return res.status(201).json({
            success: true,
            message: "Product Deleted",
            deleteProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}