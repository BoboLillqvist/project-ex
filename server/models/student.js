//TODO: schema för studenter som matchar vår modell
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const studentSchema = new Schema({
    person: { type: Schema.Types.ObjectId, ref: 'person'},
    name: String,
    education: String,
    examYear: Number,
    skills: [String],
    courses: [ { type: Schema.Types.ObjectId, ref: 'course' }]
});

module.exports = mongoose.model('student', studentSchema, 'students');
