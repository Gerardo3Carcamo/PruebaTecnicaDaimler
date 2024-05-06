import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationInventoryComponent } from './medication-inventory.component';

describe('MedicationInventoryComponent', () => {
  let component: MedicationInventoryComponent;
  let fixture: ComponentFixture<MedicationInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
