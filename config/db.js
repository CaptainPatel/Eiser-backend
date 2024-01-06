const mongoose = require('mongoose');

let connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/production");
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;