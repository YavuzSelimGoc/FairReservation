import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFairComponent } from './list-fair.component';

describe('ListFairComponent', () => {
  let component: ListFairComponent;
  let fixture: ComponentFixture<ListFairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
