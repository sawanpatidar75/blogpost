const userModel = require("../models/userModel");
let jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log("Token: ", token);
        if (!token) {
            return res.status(400).json({ message: "Token is required.", data: token });
        }
        token = token.split(' ')[1];
        console.log("Split Token: ", token);
        var privatekey = process.env.PRIVATE_KEY;
        console.log("Split privatekey: ", privatekey);

        await jwt.verify(token, privatekey, async (err, decoded) => {
            if (err) {
                console.log("Token Error: ", err);
                if (err.name == 'TokenExpiredError') {
                    return res.status(400).json({ message: "Session Time Out.", data: token });
                }
                return res.status(400).json({ message: "Invalid token.", data: token });
            } else {
                console.log("Token decode: ", decoded);

                req.decoded = decoded
                const user = await userModel.findById(decoded._id).select('-password');
                console.log("token user: ", user);
                if (!user) {
                    console.log("user not found: ", user);

                    return res.status(400).json({ message: "User not found.", data: user });
                }
                req.user = user;
                next()
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Unable to authenticate user.", data: error });
    }
}