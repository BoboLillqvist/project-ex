import { Student } from './student.model';
import { Course } from './course.model';

describe('Student', () => {
    it('Should create an instance', () => {
        expect(new Student('Roland', 'Deschain', 'Engineer', 2019, ['C#', 'js'], [new Course('testCourse')], 'roland@gg.com', '08051231'));
    });
});
