import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestNavigationBarComponent } from './guest-navigation-bar.component';

describe('GuestNavigationBarComponent', () => {
  let component: GuestNavigationBarComponent;
  let fixture: ComponentFixture<GuestNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestNavigationBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
