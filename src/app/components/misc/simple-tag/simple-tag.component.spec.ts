import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTagComponent } from './simple-tag.component';

describe('AddStudentSkillsSimpleComponent', () => {
  let component: SimpleTagComponent;
  let fixture: ComponentFixture<SimpleTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
