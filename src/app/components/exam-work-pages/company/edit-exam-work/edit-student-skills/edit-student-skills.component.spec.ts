import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentSkillsComponent } from './edit-student-skills.component';

describe('EditStudentSkillsComponent', () => {
  let component: EditStudentSkillsComponent;
  let fixture: ComponentFixture<EditStudentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
