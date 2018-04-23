import { Student } from './student.model';

describe('Student', () => {
    it('Should create an instance', () => {
        expect(new Student("Roland Deschain","0","Engineer",2019,["C#", "js"]));
    })
})