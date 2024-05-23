import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFairComponent } from './add-fair.component';

describe('AddFairComponent', () => {
  let component: AddFairComponent;
  let fixture: ComponentFixture<AddFairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
