import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamWorkComponent } from './edit-exam-work.component';

describe('EditExamWorkComponent', () => {
  let component: EditExamWorkComponent;
  let fixture: ComponentFixture<EditExamWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExamWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
