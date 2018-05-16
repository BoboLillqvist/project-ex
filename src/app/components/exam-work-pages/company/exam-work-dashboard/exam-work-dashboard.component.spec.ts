import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamWorkDashboardComponent } from './exam-work-dashboard.component';

describe('ExamWorkDashboardComponent', () => {
  let component: ExamWorkDashboardComponent;
  let fixture: ComponentFixture<ExamWorkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamWorkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamWorkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
