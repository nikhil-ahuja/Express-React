var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    carSchema;

carSchema = new Schema({
    name: String,
    model: String,
    color: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Car', carSchema);
