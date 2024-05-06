import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixChartComponent } from './mix-chart.component';

describe('MixChartComponent', () => {
  let component: MixChartComponent;
  let fixture: ComponentFixture<MixChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
