import { Course } from '../../src/app/models/course.model';
import { Person } from '../../src/app/models/person.model';
//TODO: schema för studenter som matchar vår modell
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    person: Person,
    name: String,
    education: String,
    examYear: Number,
    skills: String[],
    courses: Course[]
});

module.exports = mongoose.model('student', studentSchema, 'students');
