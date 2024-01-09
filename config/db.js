const mongoose = require('mongoose');
require("dotenv").config();


let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;