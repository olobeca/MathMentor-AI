const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}, 
}) 

module.exports = mongoose.model('user', UserSchema); 