const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const course = require('./course')


const studentSchema = new Schema({
    person: { type: Schema.Types.ObjectId, ref: 'person'},
    name: String,
    education: String,
    examYear: Number,
    description: String,
    skills: [String],
    courses: [ { type: Schema.Types.ObjectId, ref: 'course' } ],
    pictureID: String,
    pictureURL: String
});

module.exports = mongoose.model('student', studentSchema, 'students');
