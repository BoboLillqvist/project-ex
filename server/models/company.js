const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//blueprint av objektet i vår databas
//TODO:: Updatera schema så att det matchar vår modell för företag
const companySchema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('company', companySchema, 'companies');

