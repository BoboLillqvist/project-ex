const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examworkSchema = new Schema({
    _id: String,
    title: String,
    location: String,
    applyDueDate: Date,
    essentialSkills: [String],
    complementarySkills: [String],
    description: String,
    presence: String,
    contact: Person,
    teachings: String,
    company: Company
});

module.exports = mongoose.model('examwork', examworkSchema, 'examworks');