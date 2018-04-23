import { TestBed, inject } from '@angular/core/testing';

import { ExamworkService } from './examwork.service';

describe('ExamworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamworkService]
    });
  });

  it('should be created', inject([ExamworkService], (service: ExamworkService) => {
    expect(service).toBeTruthy();
  }));
});
