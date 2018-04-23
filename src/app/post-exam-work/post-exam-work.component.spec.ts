import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExamWorkComponent } from './post-exam-work.component';

describe('PostExamWorkComponent', () => {
  let component: PostExamWorkComponent;
  let fixture: ComponentFixture<PostExamWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostExamWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostExamWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
