import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentProfileComponent } from './edit-student-profile.component';

describe('EditStudentProfileComponent', () => {
  let component: EditStudentProfileComponent;
  let fixture: ComponentFixture<EditStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
