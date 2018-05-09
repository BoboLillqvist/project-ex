import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindStudentsComponent } from './find-students.component';

describe('FindStudentsComponent', () => {
  let component: FindStudentsComponent;
  let fixture: ComponentFixture<FindStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
