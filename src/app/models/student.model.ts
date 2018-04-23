import { Course } from './course.model';
import { Person } from './person.model';

export class Student {
    _id: string;
    person: Person;
    name: string;
    education: string;
    examYear: number;
    skills: Array<string>;
    courses: Array<Course>;

    constructor(firstName, lastName, education: string, examYear: number, skills: Array<string>, courses: Array<Course>, email: string,
         phoneNbr: string) {
        this.person = new Person(firstName, lastName, email, phoneNbr);
        this.name = firstName + ' ' + lastName;
        this.education = education;
        this.examYear = examYear;
        this.skills = skills;
        this.courses = courses;
    }
}
