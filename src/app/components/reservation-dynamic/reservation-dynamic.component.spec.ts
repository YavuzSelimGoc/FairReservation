import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDynamicComponent } from './reservation-dynamic.component';

describe('ReservationDynamicComponent', () => {
  let component: ReservationDynamicComponent;
  let fixture: ComponentFixture<ReservationDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
