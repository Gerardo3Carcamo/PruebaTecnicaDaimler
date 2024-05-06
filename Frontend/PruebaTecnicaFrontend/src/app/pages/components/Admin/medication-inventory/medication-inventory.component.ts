import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-medication-inventory',
  templateUrl: './medication-inventory.component.html',
  styleUrls: ['./medication-inventory.component.scss'],
})
export class MedicationInventoryComponent implements OnInit {
  constructor(
    public excel: ExcelService,
    private apiService: ApiService,
    private alert: AlertService
  ) {}

  clonedProducts: { [s: string]: any } = {};

  medicines: any = [];
  cols: any = [
    { field: 'id', header: 'Identificador' },
    { field: 'name', header: 'Nombre del medicamento' },
    { field: 'description', header: 'Descripción' },
    { field: 'existingQuantity', header: 'Cantidad en inventario' },
  ];

  ngOnInit(): void {
    this.getMedicines();
  }

  getMedicines() {
    this.apiService
      .GetMethod('Medicine/GetAllMedicinesWithStock')
      .subscribe((x) => {
        x['error']
          ? this.alert.error('Error', x['message'])
          : (this.medicines = x['data']);
      });
  }

  onRowEditInit(product) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product) {
    if (product.existingQuantity >= 0) {
      delete this.clonedProducts[product.id];
      const params = {
        Id: product.id,
        ExistingQuantity: product.existingQuantity,
      };
      this.apiService
        .PatchMethod(params, 'Medicine/UpdateInventory')
        .subscribe((x) => {
          x['error']
            ? this.alert.error('Error', x['message'])
            : this.alert.success('Ok', x['message']);
        });
    } else {
      this.alert.dynamic(
        'Advertencia',
        'Ingrese un valor mayor a 0 para la cantidad existente del medicamento',
        'warning'
      );
    }
  }

  onRowEditCancel(product, index: number) {
    this.medicines[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }
}
