const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    userId:{
        type: String,
        ref: 'user',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    featured: {
        type: Boolean,
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    likes: {
        type: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("blogs", BlogSchema)