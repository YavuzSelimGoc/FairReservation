import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFairComponent } from './update-fair.component';

describe('UpdateFairComponent', () => {
  let component: UpdateFairComponent;
  let fixture: ComponentFixture<UpdateFairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
