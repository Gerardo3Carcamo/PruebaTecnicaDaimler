import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit{

  constructor(private apiService: ApiService, private alert: AlertService, private ref: DynamicDialogRef){}

  doctors: any = [];
  selectedDoctor: any;
  selectedDate: any;

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors(){
    this.apiService.GetMethod('Users/GetAllDoctors').subscribe(x =>{
      x['error'] ? this.alert.error("Error", x["error"]): this.doctors = x['data'];
    });
  }

  saveAppointment(){
    const params = {
      DoctorId: this.selectedDoctor,
      TsAppointment: this.selectedDate,
      PatientId: +localStorage.getItem('hospitium-id'),
      State: 'Programada'
    };
    console.log(params)
    this.apiService.PostMethod(params, 'Appointment/AddNewAppointment').subscribe(x =>{
      if (x['error']) {
        this.alert.error("Error", x['message']);
      }else{
        this.alert.success("Ok", x['message']);
      }
      this.ref.close();
    });
  }

}
