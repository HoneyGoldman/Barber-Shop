import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBlockComponent } from './customer-block.component';

describe('CustomerBlockComponent', () => {
  let component: CustomerBlockComponent;
  let fixture: ComponentFixture<CustomerBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
