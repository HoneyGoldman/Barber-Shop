import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPopUpComponent } from './generic-pop-up.component';

describe('GenericPopUpComponent', () => {
  let component: GenericPopUpComponent;
  let fixture: ComponentFixture<GenericPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
