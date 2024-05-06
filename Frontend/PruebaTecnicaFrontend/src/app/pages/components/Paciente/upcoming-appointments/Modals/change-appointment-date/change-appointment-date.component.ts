import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-change-appointment-date',
  templateUrl: './change-appointment-date.component.html',
  styleUrls: ['./change-appointment-date.component.scss']
})
export class ChangeAppointmentDateComponent implements OnInit{

  constructor(private ref: DynamicDialogRef, private alert: AlertService, private apiService: ApiService, private config: DynamicDialogConfig){}

  newAppointmentDate: any = undefined;
  dataConfig: any = undefined;

  ngOnInit(): void {
    this.dataConfig = this.config.data;
  }

  changeData(){
    if(this.dateDiff(this.newAppointmentDate)){
      const params = {
        Id: this.dataConfig,
        TsAppointment: this.newAppointmentDate
      }
      this.apiService.PatchMethod(params, 'Appointment/UpdateAppointment').subscribe(x =>{
        x['error'] ? this.alert.error('Error', x['message']) : this.alert.success('Ok', x['message']);
        this.ref.close();
      });
    }else{
      this.alert.dynamic('Advertencia', 'Selecciono un dia que ya paso, seleccione un dia que sea mayor a la fecha actual.', 'warning')
      this.ref.close()
    }
  }

  cancel(){
    this.ref.close();
  }

  dateDiff(date) : boolean{
    const today = moment(new Date());
    return (today.isBefore(date) || today.isSame(date, 'day')) ? true : false;
  }

}
