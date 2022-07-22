import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTableCardComponent } from './customer-table-card.component';

describe('CustomerTableCardComponent', () => {
  let component: CustomerTableCardComponent;
  let fixture: ComponentFixture<CustomerTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTableCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
