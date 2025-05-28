const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ChunkSchema = new Schema({
    text: {type: String, required: true},
    embedding: [{type: Number, required: true}],
    sourceFile: {type: String, default: false}, 
    createdAt: {type: Date, default: Date.now},
}) 

module.exports = mongoose.model('chunk', ChunkSchema); 