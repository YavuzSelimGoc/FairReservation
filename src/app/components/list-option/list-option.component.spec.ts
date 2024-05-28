import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionComponent } from './list-option.component';

describe('ListOptionComponent', () => {
  let component: ListOptionComponent;
  let fixture: ComponentFixture<ListOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
