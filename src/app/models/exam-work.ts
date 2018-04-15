export class ExamWork {
    title: string;
    location: string;       //ort
    applyDueDate: string;   //sista anmälningsdag
    skills: Array<string>;
    description: string;

    constructor(title: string, location: string, skills: Array<string>, description: string, applyDueDate: string){
        this.title = title;
        this.location = location;
        this.skills = skills;
        this.description = description;
        this.applyDueDate = applyDueDate;
    }
}
