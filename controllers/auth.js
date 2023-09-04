const authController = require("express").Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Salt = 10;


authController.post("/register", async (req, res) => {
    try{
        const isExisting = await user.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Account already registered")
        }

        const hashPassword = await bcrypt.hash(req.body.password, Salt)
        const newUser = await user.create({...req.body, password: hashPassword})

        const {password, ...others} = newUser._doc;
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_CODE)

        return res.status(201).json({user: others, token})

    } catch(err){
        return res.status(500).json(err)
    }
})


authController.post("/login", async (req, res) => {
    try {
        const userDetails = await user.findOne({email: req.body.email});
        if(!userDetails){
            throw new Error("invalid credentials");
        }

        const comparePswrd = await bcrypt.compare(req.body.password, userDetails.password);
        if(!comparePswrd){
            throw new Error("Invalid Password")
        }

        const {password, ...others} = userDetails._doc;
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_CODE)

        return res.status(200).json({user: others, token})

    } catch (error) {
        return res.status(500).json(error)
    }
})
module.exports = authController