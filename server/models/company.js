const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//blueprint av objektet i vår databas
const companySchema = new Schema({
    name: String,
    description: String,
    url: String,
    examWorks: [{ type: Schema.Types.ObjectId, ref: 'examwork' }],
    pictureID: String
});

module.exports = mongoose.model('company', companySchema, 'companies');

