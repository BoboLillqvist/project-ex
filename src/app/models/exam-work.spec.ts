import { ExamWork } from './exam-work';

describe('ExamWork', () => {
  it('should create an instance', () => {
    expect(new ExamWork("title","location",["C#",".NET"],"test work","2018")).toBeTruthy();
  });
});
