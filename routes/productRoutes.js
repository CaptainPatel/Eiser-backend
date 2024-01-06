const authMiddleware = require("../middlewares/authMiddleware");
const express = require('express');
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController")
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/createProduct", authMiddleware.verifyUser, authMiddleware.verifyAdmin, createProduct);
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)


module.exports = router;