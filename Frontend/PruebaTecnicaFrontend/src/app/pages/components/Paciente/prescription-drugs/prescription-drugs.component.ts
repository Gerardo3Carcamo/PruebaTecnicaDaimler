import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-prescription-drugs',
  templateUrl: './prescription-drugs.component.html',
  styleUrls: ['./prescription-drugs.component.scss']
})
export class PrescriptionDrugsComponent implements OnInit{

  constructor(public excel: ExcelService, private apiService: ApiService, private alert: AlertService){}

  medicines: any = undefined;

  cols = [
    { field: 'medicineName', header: 'Nombre del medicamento' },
    { field: 'medicineDescription', header: 'Descripción' },
    { field: 'quantity', header: 'Cantidad' },
    { field: 'prescriptionDate', header: 'Fecha de Prescripción' },
  ]

  ngOnInit(): void {
    this.getMedicines()
  }

  getMedicines(){
    this.apiService.GetMethod('Prescription/GetAllMedicinesByAppointment?admin=false&patientId=' + localStorage.getItem('hospitium-id')).subscribe(x =>{
      if(!x['error']){
        this.medicines = x['data']
      }else{
        this.alert.error('Error', x['message']);
      }
    });
  }

}
