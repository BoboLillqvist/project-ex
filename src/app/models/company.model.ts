import { ExamWork } from "./exam-work.model";

export class Company {
    _id: string;
    name: string;
    description: string;
    url: string;
    examWorks: Array<ExamWork>;
    pictureID: string;
    pictureURL: string;

    constructor(name, description, url, examWorks){
        this.name = name;
        this.description = description;
        this.url = url;
        this.examWorks = examWorks;
    }
}
