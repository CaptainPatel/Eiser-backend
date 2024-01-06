const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        minLength: [6,
            "Username is too short"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email is Required"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        trim: true,
        minLength: [8, "Password is too short"],
    },
    role: {
        type: String,
        default: "user",
        trim: true,
        enum: ["admin", "user"]
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;