import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSettingsComponent } from './pdf-settings.component';

describe('PdfSettingsComponent', () => {
  let component: PdfSettingsComponent;
  let fixture: ComponentFixture<PdfSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
