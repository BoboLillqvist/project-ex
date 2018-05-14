import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentSkillsComponent } from './add-student-skills.component';

describe('AddStudentSkillsComponent', () => {
  let component: AddStudentSkillsComponent;
  let fixture: ComponentFixture<AddStudentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
