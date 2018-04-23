const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examworkSchema = new Schema({
    _id: String,
    title: string,
    location: string,
    applyDueDate: Date,
    essentialSkills: [String],
    complementarySkills: [String],
    description: String,
    presence: string,
    contact: Person,
    teachings: string,
    company: Company
});

module.exports = mongoose.model('examwork', examworkSchema, 'examworks');