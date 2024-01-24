const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
require('dotenv').config();


module.exports.login = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ email: data.email })
        if (!user) {
            console.log("user not found");
            return res.status(403).json({
                success: false,
                error: "User Is Not Registered"
            });
        }
        // generate a token
        const token = JWT.sign({ _id: user._id }, process.env.USER_VERIFICATION_TOKEN);

        // compare password with hashed password in database
        const compare = await bcrypt.compare(data.password, user.password);
        if (!compare) {
            console.log("wrong password");
            return res.status(500).json({
                success: false,
                error: "Invalid Credentials"
            });
        }

        user = user.toObject();
        delete user.password;
        res.status(201).json({
            success: true,
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports.register = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ email: data.email })
        // check if user exists
        if (user) {
            return res.status(403).json({
                success: false,
                error: "User ALready Registered"
            });
        }
        // Generate Password Hash and change users pass to hashed pass
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        user = await new User(data).save();

        // don't send password in response
        user = user.toObject();
        delete user.password;

        // token generation
        const token = JWT.sign({ _id: user._id }, process.env.USER_VERIFICATION_TOKEN);

        // create a cart for the user
        await new Cart({
            userid: user._id,
            products: []
        }).save();

        res.status(201).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}