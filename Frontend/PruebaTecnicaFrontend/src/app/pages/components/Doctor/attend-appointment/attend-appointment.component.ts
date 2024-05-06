import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faPrescriptionBottleMedical, faTable } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-attend-appointment',
  templateUrl: './attend-appointment.component.html',
  styleUrls: ['./attend-appointment.component.scss']
})
export class AttendAppointmentComponent implements OnInit{

  constructor(private apiService: ApiService, private alert: AlertService){}

  tableIcon = faTable;
  medicinesIcon = faPrescriptionBottleMedical;
  observationsIcon = faMagnifyingGlass;

  patients: any = [];
  appointmentId: number = undefined;
  previousAppointments: any = [];
  medicines: any = [];
  observations: string = '';

  ngOnInit(): void {
    this.getPatients();
    this.getMedicines();
  }

  getPatients(){
    this.apiService.GetMethod('Appointment/GetAllAppointmentsUnattended?doctorId='+localStorage.getItem('hospitium-id')).subscribe(x=>{
      x['error'] ? this.alert.error('Error', x['message']) : this.patients = x['data'];
    })
  }

  getPreviousAppointments(){
    if(this.appointmentId != null || this.appointmentId != undefined){
      this.apiService.GetMethod('Appointment/GetAllAppointmentsAttendedByPatient?patientId='+this.getPatientId(this.appointmentId)).subscribe(x =>{
        x['error'] ? this.alert.error('Error', x['message']) : this.previousAppointments = x['data'];
      });
    }
  }

  getMedicines(){
    this.apiService.GetMethod('Medicine/GetAllMedicinesWithStock').subscribe(x =>{
      x['error'] ? this.alert.error('Error', x['message']) : this.medicines = x['data'];
      this.medicines.forEach(x =>{
        x.quantity = 0;
      });
    })
  }

  clearData(){
    this.previousAppointments = []
    this.observations = '';
    this.medicines.forEach(x =>{
      x.quantity = 0;
      x.apply = false;
    })
  }

  saveAttendedAppointment(){
    let medicineList: any = this.medicines.filter(m => m.apply == true && m.quantity > 0);
    const params = {
      AppointmentId: this.appointmentId,
      PatientId: this.getPatientId(this.appointmentId),
      Observations: this.observations,
      Medicines: medicineList
    }
    console.log(params)
    this.apiService.PatchMethod(params, 'Appointment/SaveAttendedAppointment').subscribe(x =>{
      x['error'] ? this.alert.error('Error', x['message']) : this.alert.success('Ok', x['message']);
      if(x['data']) {
        this.clearData();
        this.getPatients();
        this.getMedicines();
      };
    });
  }

  getPatientName(id: any): string{
    return this.patients.filter(p => p.appointmentId == id)[0]?.patientName ?? 'Seleccione paciente'
  }
  getPatientId(id): number{
    return this.patients.filter(p => p.appointmentId == id)[0]?.patientId ?? 0;
  }

}
