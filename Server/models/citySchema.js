const mongoose = require('mongoose')
const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const City = mongoose.model("city", citySchema)
module.exports = { City }