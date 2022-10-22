import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAppointmentFormComponent } from './set-appointment-form.component';

describe('SetAppointmentFormComponent', () => {
  let component: SetAppointmentFormComponent;
  let fixture: ComponentFixture<SetAppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAppointmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
