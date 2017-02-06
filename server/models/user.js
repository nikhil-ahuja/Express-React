var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    userSchema;

userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
