export class Course {
    _id: string;
    name: string;
    points: number;

    constructor(name, points: number) {
        this.name = name;
        this.points = points;
    }

    toString() {
        return this.name + ', ' + this.points + 'hp';
    }
}

