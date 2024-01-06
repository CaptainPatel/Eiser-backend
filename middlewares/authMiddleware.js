const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

module.exports.verifyUser = async (req, res, next) => {
    try {
        let headers = req.headers.authorization;
        if (!headers) {
            return res.status(403).json({
                success: false,
                error: "No Token Provided",
            });
        }
        let token = headers.split(" ")[1];
        let { _id } = jwt.verify(token, "asn3jb4f5e5r6ck1nwa5l23knaic");
        let user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User Not Found With Provided Token"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send({
            success: false,
            error: error.message
        })
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    try {
        let user = req.user;
        if (user.role === "admin") next();
        else {
            return res.status(403).json({
                success: false,
                error: "You are not authorized to perform this action."
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).send({
            success: false,
            error: error.message
        })
    }
}

