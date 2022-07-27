import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMyOrderComponent } from './set-my-order.component';

describe('SetMyOrderComponent', () => {
  let component: SetMyOrderComponent;
  let fixture: ComponentFixture<SetMyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetMyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
