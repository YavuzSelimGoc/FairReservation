import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPdfSettingComponent } from './add-pdf-setting.component';

describe('AddPdfSettingComponent', () => {
  let component: AddPdfSettingComponent;
  let fixture: ComponentFixture<AddPdfSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPdfSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPdfSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
