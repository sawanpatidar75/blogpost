const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const { generateToken } = require('../helpers/helper');


exports.userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log("Signup User: ", name, email, password);
        if (name == "" || email == "" || password == "") {
            return res.status(400).json({ message: "Please fill all the required fields.", data: req.body });
        };
        const checkUser = await userModel.find({ email: email });
        console.log("checkUser: ", checkUser);
        if (checkUser && checkUser.length > 0) {
            return res.status(400).json({ message: "User already exist", data: checkUser });
        };
        let user = await userModel({
            name: name,
            email: email,
            password: password
        });
        let saveUser = await user.save();
        console.log("saveUser: ", saveUser);
        return res.status(200).json({ message: "User created successfully", data: saveUser })

    } catch (error) {
        console.log("userSignup Error: ", error);
        return res.status(500).json({ message: "Unable to register user.", data: error });

    }
};

exports.userLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        const checkUser = await userModel.findOne({ email }).select("+password");
        console.log("checkUser: ", checkUser);
        if (!checkUser) {
            return res.status(400).json({ message: "User not found", data: checkUser });
        };
        const isPasswordMatched = await checkUser.comparePassword(password);
        console.log("isPasswordMatched: ", isPasswordMatched);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid username or password.", data: checkUser[0] });
        }
        let params = {
            _id: checkUser._id,
            name: checkUser.name,
            email: checkUser.email,
        }
        let tempKey = process.env.PRIVATE_KEY
        let expire = '1d'
        const token = await generateToken(params, tempKey, expire);

        return res.status(200).json({
            message: "User login successfully", data: {
                _id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email, 
                token: token
            }
        });


    } catch (error) {
        return res.status(500).json({ message: "Something want wrong", data: error });
    }
};

exports.userProfile = async (req, res, next) => {
    try {
        let user = req.user;
        return res.status(200).json({ message: "User details get successfully.", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Unable to verify user.", data: error });
    }
}