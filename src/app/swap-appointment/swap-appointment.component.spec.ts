import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapAppointmentComponent } from './swap-appointment.component';

describe('SwapAppointmentComponent', () => {
  let component: SwapAppointmentComponent;
  let fixture: ComponentFixture<SwapAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
