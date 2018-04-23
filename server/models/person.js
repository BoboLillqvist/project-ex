
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNbr: String
})

module.exports = mongoose.model('person', personSchema, 'persons');