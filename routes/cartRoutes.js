const express = require("express");
const { getUserCart, addToCart, deleteFromCart } = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();
router.get("/", authMiddleware.verifyUser, getUserCart);
router.put("/addToCart", authMiddleware.verifyUser, addToCart);
router.put("/delete/:id", authMiddleware.verifyUser, deleteFromCart);

module.exports = router;