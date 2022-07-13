import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHebComponentComponent } from './login-heb-component.component';

describe('LoginHebComponentComponent', () => {
  let component: LoginHebComponentComponent;
  let fixture: ComponentFixture<LoginHebComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginHebComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHebComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
