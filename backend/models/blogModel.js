const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    lastEditedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    lockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    lockedAt: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('blogs', blogSchema);