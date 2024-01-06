const express = require('express');
const server = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');

// Application Middleware
server.use(express.static("public"));
server.use(express.json());
server.use(cors());


// Route Group Middleware
server.use("/products", productRoutes);
server.use("/users", userRoutes);
server.use("/cart", cartRoutes);


server.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to our Backend",
    });
});

connectDB()
    .then(() => {
        server.listen(5000, () => {
            console.log("server started");
        });
    })
    .catch((error) => console.error(error))