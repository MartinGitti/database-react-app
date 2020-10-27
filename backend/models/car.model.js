const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: { type: Number },
    make: String,
    colour: String,
    registration: String,
    number: String,
    owner: String,
    address: String
}, {
    require: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;