const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    type: String,
    values: []
});

module.exports = mongoose.model('tag', tagsSchema, 'tags');