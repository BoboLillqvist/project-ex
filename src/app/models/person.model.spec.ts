import { Person } from './person.model';

describe('Person', () => {
  it('should create an instance', () => {
    expect(new Person("Roland","Deschain","Deschain@gg.com", "08623344")).toBeTruthy();
  });
});
