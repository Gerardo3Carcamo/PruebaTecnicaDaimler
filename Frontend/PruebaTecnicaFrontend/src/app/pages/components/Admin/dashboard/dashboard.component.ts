import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private apiService: ApiService, private alert: AlertService){}

  appointments: any = [];
  medicines: any = [];

  ngOnInit(): void {
    this.getAppointmentByDayChart();
    this.GetMedicinesByDoctor()
  }

  getAppointmentByDayChart(){
    this.apiService.GetMethod('Dashboard/GetAppointmentsAttendedByDay').subscribe(x =>{
      x['error'] ? this.alert.error('Error', x['message']) : this.appointments = x['data'];
    })
  }
  GetMedicinesByDoctor(){
    this.apiService.GetMethod('Dashboard/GetMedicinesByDoctor').subscribe(x =>{
      x['error'] ? this.alert.error('Error', x['message']) : this.medicines = x['data'];
    })
  }

}
