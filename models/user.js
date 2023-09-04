const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        min: 6
    }
}, {timestamps: true})

module.exports = mongoose.model("user", UserSchema)