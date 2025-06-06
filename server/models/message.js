const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content : [{ type: String, required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now },
    isAI: { type: Boolean, default: false },
})

module.exports = mongoose.model('message', MessageSchema);