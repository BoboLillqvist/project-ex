import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewExamWorkComponent } from './student-view-exam-work.component';

describe('StudentViewExamWorkComponent', () => {
  let component: StudentViewExamWorkComponent;
  let fixture: ComponentFixture<StudentViewExamWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentViewExamWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewExamWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
