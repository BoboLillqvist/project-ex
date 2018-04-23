const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//blueprint av objektet i vår databas
const companySchema = new Schema({
    _id: String,
    name: String,
    description: String,
    url: String,
    examWorks: Array<ExamWork>[]
});

module.exports = mongoose.model('company', companySchema, 'companies');

