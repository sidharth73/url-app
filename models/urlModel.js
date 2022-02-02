const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('url',UrlSchema);