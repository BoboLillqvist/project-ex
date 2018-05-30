import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentProfileComponent } from './create-student-profile.component';

describe('CreateStudentProfileComponent', () => {
  let component: CreateStudentProfileComponent;
  let fixture: ComponentFixture<CreateStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
