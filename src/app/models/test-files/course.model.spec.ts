import { Course } from './course.model';

describe('Course', () => {
  it('should create an instance', () => {
    expect(new Course('Datateknik')).toBeTruthy();
  });
});
