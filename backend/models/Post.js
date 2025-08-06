const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    isDeleted: {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);
