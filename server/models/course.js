const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    points: Number,
});

module.exports = mongoose.model('course', courseSchema, 'courses');