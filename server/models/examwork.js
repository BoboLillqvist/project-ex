const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    _id: String,
    title: string,
    location: string,
    applyDueDate: Date,
    essentialSkills: Array<string>[],
    complementarySkills: Array<string>[],
    description: String,
    presence: string,
    contact: Person,
    teachings: string,
    company: Company
});
