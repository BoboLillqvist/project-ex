const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examworkSchema = new Schema({
    title: String,
    location: String,
    applyDueDate: Date,
    essentialSkills: [String],
    complementarySkills: [String],
    description: String,
    presence: String,
    contact: { type: Schema.Types.ObjectId, ref: 'person'},
    teachings: String,
    company: { type: Schema.Types.ObjectId, ref: 'company'}
});

module.exports = mongoose.model('examwork', examworkSchema, 'examworks');