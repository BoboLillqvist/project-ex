import { Course } from './course.model';
import { Person } from './person.model';

export class Student {
    _id: string;
    person: Person;
    personId: string;
    name: string;
    education: string;
    examYear: number;
    description: string;
    skills: Array<string>;
    courses: Array<Course>;
    courseIds: string[] = [];
    pictureID: string;

    constructor(firstName, lastName, education: string, examYear: number, description, skills: Array<string>,
                    courses: Array<Course>, email: string, phoneNbr: string) {
        this.person = new Person(firstName, lastName, email, phoneNbr);
        this.name = firstName + ' ' + lastName;
        this.education = education;
        this.examYear = examYear;
        this.description = description;
        this.skills = skills;
        this.courses = courses;
    }

    toString() {
        return this.name + ', ' + this.person.email;
    }
}
