import { ExamWork } from './exam-work.model';
import { Person } from './person.model';
import { Company } from './company.model';


describe('ExamWork', () => {
  it('should create an instance', () => {
    const person = new Person('Roland', 'Deschain', 'Deschain@gg.com', '08623344');
    const company = new Company('GGCorp', 'ggnore', 'https://ggcorp.org', []);
    expect(new ExamWork('title', 'location', ['C#', '.NET'], ['Fluent english'], 'test work', new Date(), 'Full time',
     person, 'You will learn so much', company)).toBeTruthy();
  });
});
