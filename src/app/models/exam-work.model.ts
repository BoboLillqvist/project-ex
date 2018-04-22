import { Company } from "./company.model";
import { Person } from "./person.model";

export class ExamWork {
    _id: string;
    title: string;
    location: string;      
    applyDueDate: Date;   
    essentialSkills: Array<string>;
    complementarySkills: Array<string>;
    description: string;
    presence: string;
    contact: Person; 
    teachings: string;
    company: Company;

    constructor(title: string, location: string, essentialSkills: Array<string>, complementarySkills: Array<string>, description: string, applyDueDate: Date, presence: string, contact: Person, teachings: string, company: Company){
        this.title = title;
        this.location = location;
        this.essentialSkills = essentialSkills;
        this.complementarySkills = complementarySkills;
        this.description = description;
        this.applyDueDate = applyDueDate;
        this.presence = presence;
        this.contact = contact;
        this.teachings = teachings;
        this.company = company;
    }
}
