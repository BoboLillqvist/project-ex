export class Student {
    name: string;
    id: string;
    skills: Array<string>;

    constructor(name: string, id: string, skills: Array<string>){
        this.name = name;
        this.id = id;
        this.skills = skills;
    }
}
