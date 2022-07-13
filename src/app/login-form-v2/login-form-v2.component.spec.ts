import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormV2Component } from './login-form-v2.component';

describe('LoginFormV2Component', () => {
  let component: LoginFormV2Component;
  let fixture: ComponentFixture<LoginFormV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
