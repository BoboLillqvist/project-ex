
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phoneNbr: String
})

module.exports = mongoose.model('person', personSchema, 'persons');