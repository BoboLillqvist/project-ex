export class Student {
    name: string;
    id: string;
    education: string;
    examYear: number;
    skills: Array<string>;

    constructor(name: string, id: string, education: string, examYear: number, skills: Array<string>){
        this.name = name;
        this.id = id;
        this.education = education;
        this.examYear = examYear;
        this.skills = skills;
    }
}
