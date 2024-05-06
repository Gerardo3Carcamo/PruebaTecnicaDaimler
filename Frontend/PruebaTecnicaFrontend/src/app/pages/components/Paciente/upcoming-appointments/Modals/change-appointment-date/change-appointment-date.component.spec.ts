import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAppointmentDateComponent } from './change-appointment-date.component';

describe('ChangeAppointmentDateComponent', () => {
  let component: ChangeAppointmentDateComponent;
  let fixture: ComponentFixture<ChangeAppointmentDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAppointmentDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAppointmentDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
