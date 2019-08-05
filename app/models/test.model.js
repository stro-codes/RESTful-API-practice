const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    name: String,
    address: String
}//, {
   // timestamps: true
);

module.exports = mongoose.model('Test', TestSchema);