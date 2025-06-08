const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PdfSchema = new Schema({
    filename: {type: String, required: true},
    source: {type: String, required: true},
    length: {type: String, required: false},
    uploadData: {type: Date, default: Date.now},  
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}) 

module.exports = mongoose.model('pdf', PdfSchema); 