import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChoiceComponent } from './register-choice.component';

describe('RegisterChoiceComponent', () => {
  let component: RegisterChoiceComponent;
  let fixture: ComponentFixture<RegisterChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
