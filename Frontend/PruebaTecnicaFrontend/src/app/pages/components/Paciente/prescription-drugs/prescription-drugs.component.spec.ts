import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDrugsComponent } from './prescription-drugs.component';

describe('PrescriptionDrugsComponent', () => {
  let component: PrescriptionDrugsComponent;
  let fixture: ComponentFixture<PrescriptionDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionDrugsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
