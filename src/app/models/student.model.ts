import { Course } from "./course.model";

export class Student {
    _id: string;
    name: string;
    education: string;
    examYear: number;
    skills: Array<string>;
    courses: Array<Course>;
    email: string;

    constructor(name: string, education: string, examYear: number, skills: Array<string>, courses: Array<Course>, email: string){
        this.name = name;
        this.education = education;
        this.examYear = examYear;
        this.skills = skills;
        this.courses = courses;
        this.email = email;
    }
}
