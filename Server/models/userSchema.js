const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        required: false
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
})

const User = mongoose.model("user", userSchema)
module.exports = { User }