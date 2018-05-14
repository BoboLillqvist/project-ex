import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyProfileComponent } from './create-company-profile.component';

describe('CreateCompanyProfileComponent', () => {
  let component: CreateCompanyProfileComponent;
  let fixture: ComponentFixture<CreateCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
